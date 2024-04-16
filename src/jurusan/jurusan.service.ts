import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { CreateJurusanDto } from './dto/create-jurusan.dto';
import { Jurusan } from './entities/jurusan.entity';

@Injectable()
export class JurusanService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createJurusanDto: CreateJurusanDto){
    const jurusanData = new Jurusan()
    jurusanData.kode = createJurusanDto.kode;
    jurusanData.nama = createJurusanDto.nama

    const data = await this.supabaseService.client
      .from('jurusan')
      .insert([jurusanData]);
      
    return data;
  }

  async findByCodeUniv(codeUniv: number){
    const data = await this.supabaseService.client
      .from('jurusan')
      .select('*')
      .eq('kode', codeUniv)

    return data;
  }

}
