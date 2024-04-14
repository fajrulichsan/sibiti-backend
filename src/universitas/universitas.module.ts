import { Module } from '@nestjs/common';
import { UniversitasService } from './universitas.service';
import { UniversitasController } from './universitas.controller';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  controllers: [UniversitasController],
  providers: [UniversitasService, SupabaseService],
})
export class UniversitasModule {}
