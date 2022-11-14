import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';

@ApiTags('auth')
@UseGuards(AuthGuard)
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  public login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
