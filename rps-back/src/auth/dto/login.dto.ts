import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  username: string;
}

export class LoginResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  token: string;
}

export class LoginValidateResponseDto {
  @IsBoolean()
  @ApiProperty({ type: Boolean })
  isValid: boolean;
}
