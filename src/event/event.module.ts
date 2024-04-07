import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  controllers: [EventController],
  providers: [EventService, SupabaseService],
})
export class EventModule {}
