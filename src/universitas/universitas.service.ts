import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { CreateUniversitasDto } from './dto/create-universitas.dto';
import { Universitas } from './entities/universita.entity';

@Injectable()
export class UniversitasService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll() {
    const data = await this.supabaseService.client
      .from('universitas')
      .select('*')

    return data;
  }

  async create(createUniversitasDto: CreateUniversitasDto){
    const univ = new Universitas()
    univ.kode = createUniversitasDto.kode
    univ.nama = createUniversitasDto.nama

    const data = await this.supabaseService.client
      .from('universitas')
      .insert([univ]);

    return data;
  }

  async findOne(id: number) {
    const data = await this.supabaseService.client
      .from('universitas')
      .select('*')
      .eq('id', id)
      .single();

    return data ;
  }
}
