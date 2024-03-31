import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyAccountDto {
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'OTP is required' })
    otp: number;
}
