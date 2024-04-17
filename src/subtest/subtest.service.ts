import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { Subtest } from './entities/subtest.entity';
import { CreateSubtestDto } from './dto/create-subtest.dto';
import { UpdateSubtestDto } from './dto/update-subtest.dto';

@Injectable()
export class SubtestService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createSubtestDto: CreateSubtestDto){
    const data = await this.supabaseService.client
      .from('subtest')
      .insert([
        this.convertToSubtest(createSubtestDto),
      ]);

    return data;
  }

  async findAll(){
    const data = await this.supabaseService.client
      .from('subtest')
      .select('*')
      .eq("statusData", 1)
      .order('updatedAt', { ascending: false });

    return data;
  }

  async findOne(id: number){
    const data = await this.supabaseService.client
      .from('subtest')
      .select('*')
      .eq('id', id)
      .eq("statusData", 1)
      .single();

    return data;
  }

  async update(id: number, updateSubtestDto: UpdateSubtestDto){
    const data = await this.supabaseService.client
      .from('subtest')
      .update({
        eventId : updateSubtestDto.eventId,
        name: updateSubtestDto.name,
        deskripsi: updateSubtestDto.deskripsi,
        jumlahSoal: updateSubtestDto.jumlahSoal,
        opsi: updateSubtestDto.opsi,
        waktu: updateSubtestDto.waktu,
        status: updateSubtestDto.status,
        updatedAt : new Date()
      })
      .eq('id', id);

    return data;
  }

  async remove(id: number){
    const data = await this.supabaseService.client
      .from('subtest')
      .update({ statusData: 2 })
      .eq('id', id);

    return data;
  }

  async getAllByEventId(eventId: number){
    const data = await this.supabaseService.client
      .from('subtest')
      .select('*')
      .eq('eventId', eventId)
      .eq("statusData", 1)
      .order('updatedAt', { ascending: false });

    return data;
  }

  private convertToSubtest(data: any): Subtest {
    const subtest = new Subtest();
    subtest.eventId = data.eventId;
    subtest.name = data.name;
    subtest.deskripsi = data.deskripsi;
    subtest.jumlahSoal = data.jumlahSoal;
    subtest.opsi = data.opsi;
    subtest.waktu = data.waktu;
    subtest.status = data.status;
    return subtest;
  }
}
