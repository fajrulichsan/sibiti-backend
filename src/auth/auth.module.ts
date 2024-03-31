import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import AuthController from './auth.controller';
import { UserService } from 'src/user/user.service';
import { ProfileService } from 'src/profile/profile.service';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, ProfileService, SupabaseService],
})
export class AuthModule {}
