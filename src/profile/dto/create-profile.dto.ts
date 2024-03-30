import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty({ message: 'User ID is required' })
  userId: number;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Full Name is required' })
  fullName: string;

  @IsNotEmpty({ message: 'Born is required' })
  born: string;

  @IsNotEmpty({ message: 'School is required' })
  school: string;

  @IsNotEmpty({ message: 'Province is required' })
  province: string;

  @IsNotEmpty({ message: 'City is required' })
  city: string;

  @IsNotEmpty({ message: 'Phone Number is required' })
  @Length(10, 15, { message: 'Phone Number must be between 10 and 15 characters' })
  phoneNumber: string;
}
