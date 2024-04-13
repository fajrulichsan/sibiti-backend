import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ProfileService } from '../profile/profile.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateProfileDto } from '../profile/dto/create-profile.dto';
import * as nodemailer from 'nodemailer';
import { LoginUserDto } from './dto/login-user.dto';
import { VerifyAccountDto } from './dto/verify-account.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
    // private readonly emailService: EmailService,
  ) {}

  async signUp(createUserDto: CreateUserDto, createProfileDto: CreateProfileDto) {
    const email = createUserDto.email;

    // Create user
    const newUser = await this.userService.create(createUserDto);

    if (!newUser) {
      throw new HttpException("Failed to create user", HttpStatus.BAD_REQUEST);
    }

    // Find user by email
    const foundUser = await this.userService.findByEmail(email);

    if (!foundUser) {
      throw new HttpException("User not found after creation", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Create new profile
    createProfileDto.email = foundUser.email;
    createProfileDto.userId = foundUser.id;

    const newProfile = await this.profileService.create(createProfileDto);

    if (!newProfile) {
      throw new HttpException("Failed to create profile", HttpStatus.BAD_REQUEST);
    }

    const otp = foundUser.otp_verification;
    const subject = 'Account Verification';
    const html = `<p>Your OTP: ${otp}</p>`;

    // Simulate sending email for demo purposes
    await this.sendEmail(foundUser.email, subject, html);

    return { message: "Sign up successful, check your email for OTP" , userId : foundUser.id};
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    // Find user by email
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    // Verify password
    const isPasswordValid = await this.userService.comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    if (!user.is_verification) {
      throw new HttpException("User is not verified", HttpStatus.UNAUTHORIZED);
    }

    return {
      message : "Login successfully", 
      data : {
        userId : user.id,
        email : user.email,
    }}

  }

  async verifyAccount(verifyAccountDto: VerifyAccountDto): Promise<void> {
    const { email, otp } = verifyAccountDto;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.is_verification) {
      throw new HttpException('Account already verified', HttpStatus.OK);
    }
    
    if (user.otp_verification != otp) {
      throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
    }

    // Verifikasi akun
    user.is_verification = true;
    const userVerified = await this.userService.update(user.id, user);
    if(userVerified.error == null || userVerified.status == 204){
      throw new HttpException('Account successfully verified', HttpStatus.OK);
    }
  }


    
  public async sendEmail(to: string, subject: string, html: string): Promise<void> {
    try {
      const mailOptions = {
        from: 'eurekademy@gmail.com', 
        to,
        subject,
        html
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to} successfully.`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fajrulichsan0208@gmail.com',  //TODO buat email baru
      pass: 'xoty evqi sghp uxtj' 
    }
  });

}
