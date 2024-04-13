import { Module } from '@nestjs/common';
import { SoalService } from './soal.service';
import { SoalController } from './soal.controller';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  controllers: [SoalController],
  providers: [SoalService, SupabaseService]
})
export class SoalModule {}
