import { IsNotEmpty } from 'class-validator';

export class CreateUserRoleDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  email: Array<string>;

  @IsNotEmpty()
  role: string;
}
