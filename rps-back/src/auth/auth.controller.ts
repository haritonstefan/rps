import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  LoginDto,
  LoginResponseDto,
  LoginValidateResponseDto,
} from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { User } from '../decorators/user.decorator';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiResponse({ type: LoginResponseDto })
  public login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @ApiSecurity('bearer')
  @ApiResponse({ type: LoginValidateResponseDto })
  @Get('/validate')
  public validate(@User() user: string): Promise<LoginValidateResponseDto> {
    return this.authService.validate(user);
  }
}
