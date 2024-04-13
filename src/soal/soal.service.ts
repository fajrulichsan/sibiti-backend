import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { CreateSoalDto } from './dto/create-soal.dto';
import { Soal } from './entities/soal.entity';

@Injectable()
export class SoalService {

  constructor(private readonly supabaseService: SupabaseService) {
  }

  async create(createSoalDto: CreateSoalDto) {
    const { data, error } = await  this.supabaseService.client
      .from('soals')
      .insert([{ ...createSoalDto, created_at: new Date(), updated_at: new Date() }]);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async findAll(eventId: number, subtestId: number){
    const data = await this.supabaseService.client
      .from('soal')
      .select('*')
      .eq('eventId', eventId)
      .eq('subtestId', subtestId);

    return data;
  }

  async findOne(eventId: number, subtestId: number, no: number){
    const data = await this.supabaseService.client
      .from('soal')
      .select('*')
      .eq('eventId', eventId)
      .eq('subtestId', subtestId)
      .eq('no', no)
      .single();

    return data;
  }

  async update(id: number, updateSoalDto: Partial<CreateSoalDto>): Promise<Soal> {
    const { data, error } = await  this.supabaseService.client

      .from('soals')
      .update(updateSoalDto)
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async remove(id: number){
    const { data, error } = await  this.supabaseService.client
    .from('soals').delete().eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
