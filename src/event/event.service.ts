import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    private readonly supabaseService: SupabaseService,
    ) {}

  async create(newEvent : Event ) {
    const eventAlreadyExist = await this.eventAlreadyExist(newEvent.name)
    if (eventAlreadyExist) {
      throw new HttpException('This event name already exist',HttpStatus.BAD_REQUEST )
    }

    const data = await this.supabaseService.client
      .from('events')
      .insert(newEvent);

    return data;
  }

  async findAll() {
      const data = await this.supabaseService.client
      .from('events')
      .select('*')
      .order('updatedAt', { ascending: false });

    return data;
  }

  async findOne(id: number) {
    const data = await this.supabaseService.client
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    return data;
  }

  async update(id: number, event: Event) {
    const eventExists = await this.eventAlreadyExist(event.name);

    if (eventExists) {
      throw new HttpException('Event dengan nama yang sama sudah terdaftar', HttpStatus.BAD_REQUEST);
    }
 
    const data = await this.supabaseService.client
      .from('events')
      .update(event)
      .eq('id', id);

    return data;
  }

  async remove(id: number) {
    const updateData = {
      statusData: 2,
    };

    const updateResult = await this.supabaseService.client
      .from('events')
      .update(updateData)
      .eq('id', id);

    return updateResult;
}

  async eventAlreadyExist(name: string) {
    const data = await this.supabaseService.client
      .from('events')
      .select('*')
      .eq('name', name)
      .eq('statusData', 1);

    return data.data.length > 0; 
  }

}
