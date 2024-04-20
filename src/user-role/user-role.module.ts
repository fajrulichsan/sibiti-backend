import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  controllers: [UserRoleController],
  providers: [UserRoleService, SupabaseService],
})
export class UserRoleModule {}
