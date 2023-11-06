import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';
import { Public } from '../../config/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Public()
  @HttpCode(200)
  @Post('login')
  login(@Body() dto: loginDto) {
    return this.authservice.login(dto);
  }

  @Public()
  @Post('register')
  register(@Body() dto: registerDto) {
    return this.authservice.register(dto);
  }
}
