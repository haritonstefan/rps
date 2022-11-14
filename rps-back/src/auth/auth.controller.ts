import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { User } from '../decorators/user.decorator';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  public login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiSecurity('bearer')
  @Get('/validate')
  public validate(@User() user: string): Promise<boolean> {
    return this.authService.validate(user);
  }
}
