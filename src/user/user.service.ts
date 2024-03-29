import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(): Promise<User[]> {
    try {
      const { data, error } = await this.supabaseService.client
        .from('users')
        .select('*');
      
      if (error) {
        throw new Error(error.message);
      }

      return data as User[];
    } catch (error) {
      throw new Error('Failed to find all users: ' + error.message);
    }
  }

  async findById(id: number): Promise<User> {
    try {
      const { data, error } = await this.supabaseService.client
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        throw new Error(error.message);
      }

      return data as User;
    } catch (error) {
      throw new Error('Failed to find user by id: ' + error.message);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const { data, error } = await this.supabaseService.client
        .from('users')
        .insert([user]);
      
      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        return data as User;
      } else {
        throw new Error('Failed to create user');
      }
    } catch (error) {
      throw new Error('Failed to create user: ' + error.message);
    }
  }

  async update(id: number, user: User): Promise<User> {
    try {
      const { data, error } = await this.supabaseService.client
        .from('users')
        .update(user)
        .eq('id', id);
      
      if (error) {
        throw new Error(error.message);
      }

      return data as User;
    } catch (error) {
      throw new Error('Failed to update user: ' + error.message);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const { error } = await this.supabaseService.client
        .from('users')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      throw new Error('Failed to remove user: ' + error.message);
    }
  }
}

