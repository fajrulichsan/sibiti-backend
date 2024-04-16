import { Module } from '@nestjs/common';
import { JurusanService } from './jurusan.service';
import { JurusanController } from './jurusan.controller';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  controllers: [JurusanController],
  providers: [JurusanService, SupabaseService],
})
export class JurusanModule {}
