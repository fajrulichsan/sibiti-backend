import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty({ message: 'Name is required' })
    username: string;
  
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}

