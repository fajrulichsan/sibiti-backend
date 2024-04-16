import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(newEvent: Event) {
    const eventAlreadyExist = await this.eventAlreadyExist(newEvent.name);
    console.log(eventAlreadyExist);

    if (eventAlreadyExist) {
      throw new HttpException(
        'Event dengan nama yang sama sudah terdaftar',
        HttpStatus.NOT_FOUND,
      );
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
      .eq('statusData', 1)
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
    const existingEvent = await this.findOne(id);
    event.updatedAt = new Date();

    // Jika event dengan ID tidak ditemukan
    if (!existingEvent) {
      throw new HttpException('Event tidak ditemukan', HttpStatus.NOT_FOUND);
    }

    const normalizedNewName = event.name.trim().toLowerCase();
    const normalizedExistingName = existingEvent.data.name.trim().toLowerCase();

    // Jika nama event tidak berubah
    if (normalizedNewName === normalizedExistingName) {
      const data = await this.supabaseService.client
        .from('events')
        .upsert([{ ...event, id }])
        .eq('id', id);

      return data;
    }

    // Jika nama event berubah, periksa apakah nama sudah terdaftar
    const eventExists = await this.eventAlreadyExist(event.name);

    if (eventExists) {
      throw new HttpException(
        'Event dengan nama yang sama sudah terdaftar',
        HttpStatus.BAD_REQUEST,
      );
    }

    const data = await this.supabaseService.client
      .from('events')
      .upsert([{ ...event, id }])
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

  async getEventByName(name: string){
    // Normalisasi nama event untuk memastikan konsistensi
    const normalizedName = name.trim().toLowerCase();

    // Query data event berdasarkan nama yang sudah dinormalisasi
    const data = await this.supabaseService.client
      .from('events')
      .select('*')
      .ilike('name', `%${name}%`);
      
    return data;
  }
}
