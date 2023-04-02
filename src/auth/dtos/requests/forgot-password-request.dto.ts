import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordRequestDto {
  @ApiProperty()
  @IsString()
  @IsEmail({}, { message: 'Formato de Email inválido.' })
  @IsNotEmpty({ message: 'Email requerido.' })
  readonly email: string;
}
