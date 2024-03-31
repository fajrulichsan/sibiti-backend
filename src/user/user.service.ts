import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';


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

  async findById(id: number){
      const data = await this.supabaseService.client
        .from('users')
        .select('*')
        .eq('id', id)
        .single();      
      
      if (data.error){
        console.log(data);
        throw new HttpException("User Not Found", HttpStatus.BAD_REQUEST);
      }

      return data;
  }


  async create(createUserDto: CreateUserDto) {
      const existingUser = await this.findByEmail(createUserDto.email);
      if (existingUser) {
        throw new HttpException("Email is already in use", HttpStatus.BAD_REQUEST)
      }

      const newUser = new User();
      newUser.email = createUserDto.email;
      newUser.password = await this.hashPassword(createUserDto.password);
      newUser.otp_verification = randomInt(100000, 999999);

      const data = await this.supabaseService.client
        .from('users')
        .insert([newUser]);
      
      if (data.status == 201) {
        return newUser;
      }else{
        throw new HttpException(data.statusText, HttpStatus.NOT_FOUND);
      }
  }


  async update(id: number, user: User){
      const data = await this.supabaseService.client
        .from('users')
        .update(user)
        .eq('id', id);
      
      if (data.error) {
        throw new HttpException(data.error, HttpStatus.BAD_REQUEST);
      }

      return data;
  }


  //become delete
  async remove(id: number): Promise<void> {
      const user = await this.findById(id);

      const data = await this.supabaseService.client
        .from('users')
        .delete()
        .eq('id', id);

      if (data.error == null ) {
        throw new HttpException("User delete successfully", HttpStatus.OK)
      }
    } 

  async findByEmail(email: string): Promise<User> {
    const { data } = await this.supabaseService.client
      .from('users')
      .select('*')
      .eq('email', email)
      .single();  

    return data ;
  }

  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

}

