import { Module } from '@nestjs/common';
import { SubtestService } from './subtest.service';
import { SubtestController } from './subtest.controller';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  controllers: [SubtestController],
  providers: [SubtestService, SupabaseService],
})
export class SubtestModule {}
