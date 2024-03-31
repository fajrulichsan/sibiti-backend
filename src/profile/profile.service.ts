import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { Profile } from './entities/profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class ProfileService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createProfileDto: CreateProfileDto){
    const id = Number(new Date().getTime());
    const profileData = { ...createProfileDto, id };

    const data = await this.supabaseService.client
      .from('profiles')
      .insert([profileData]);

    if (data.error) {
      return data;
    }else{
      return profileData;
    }
  }

  async findAll() {
    const data = await this.supabaseService.client
      .from('profiles')
      .select('*');

    if (data.error) {
      return data;
    }

    return data;
  }

  async findOne(userId: number) {
    const data = await this.supabaseService.client
      .from('profiles')
      .select('*')
      .eq('userId', userId)
      
      if (data.data.length == 0) {
        throw new HttpException("Profile not found", HttpStatus.BAD_REQUEST);
      }
     
    return data;
  }

  async update(userId: number, updateProfileDto: UpdateProfileDto) {    
    const user =  await this.findOne(userId)
    const data = await this.supabaseService.client
      .from('profiles')
      .update(updateProfileDto)
      .eq('userId', userId);

    console.log(data);
    if(data.status == 204){
      throw new HttpException("Profile update successfully", HttpStatus.OK);
    }
    return data ;
  }

  async remove(id: number): Promise<void> {
    const { error } = await this.supabaseService.client
      .from('profiles')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  }
}
