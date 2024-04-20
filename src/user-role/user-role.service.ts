import { Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { UserRole } from './entities/user-role.entity';

@Injectable()
export class UserRoleService {
  constructor(private readonly supabaseService: SupabaseService) {}


  async create(createUserRoleDto: CreateUserRoleDto) {
    const { email, userId, role } = createUserRoleDto;
    const createdData = [];

    for (let i = 0; i < email.length; i++) {
      const newData = new UserRole();
      newData.email = email[i];
      newData.userId = userId[i];
      newData.role = role;
      const { data, error } = await this.supabaseService.client
        .from('userRole')
        .insert([newData]);

      if (error) throw new Error(error.message);
      createdData.push(data);
    }

    return createdData;
  }


  async findAll() {
    const { data, error } = await this.supabaseService.client
      .from('userRole')
      .select('*')
      .eq("statusData", 1)

    if (error) throw new Error(error.message);
    return data;
  }

  async findOne(id: number) {
    const { data, error } = await this.supabaseService.client
      .from('userRole')
      .select('*')
      .eq('id', id)
      .eq("statusData", 1)

      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  async update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    const { data, error } = await this.supabaseService.client
      .from('userRole')
      .update(updateUserRoleDto)
      .match({ id });
    if (error) throw new Error(error.message);
    return data;
  }

  async remove(id: number) {
    const { data, error } = await this.supabaseService.client
      .from('userRole')
      .update({ statusData: 2 })
      .match({ id });
    if (error) throw new Error(error.message);
    return data;
  }

  async findByRole(role: string) {
    console.log("find by role");
    
    const { data, error } = await this.supabaseService.client
      .from('userRole')
      .select('*')
      .eq('role', role)
      .eq("statusData", 1);

    if (error) throw new Error(error.message);
    return data;
  }
}
