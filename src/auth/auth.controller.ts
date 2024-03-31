import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { VerifyAccountDto } from './dto/verify-account.dto';


@Controller('auth')
export default class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post("/sign-up")
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true })) 
  async create(@Body() createUserDto: CreateUserDto, @Body() createProfileDto : CreateProfileDto) {
    return await this.authService.signUp(createUserDto, createProfileDto);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async login(@Body() loginUserDto: LoginUserDto){
    return await this.authService.login(loginUserDto);
  }

  @Post('/verify-account')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async verifyAccount(@Body() verifyAccountDto: VerifyAccountDto) {
    return await this.authService.verifyAccount(verifyAccountDto);
  }
}
