import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserLoginRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly address: string;
}
