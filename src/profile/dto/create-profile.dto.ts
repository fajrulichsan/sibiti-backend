import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class CreateProfileDto {
  userId: number;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  fullName: string;

  born: string;

  school: string;

  province: string;

  city: string;

  phoneNumber: string;

  universitas : string;
  
  jurusan : string;
}
