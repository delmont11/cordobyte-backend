import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ValidateTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Token requerido.' })
  readonly token: string;

  @ApiProperty()
  @IsString()
  @IsEmail({}, { message: 'Formato de Email inválido.' })
  @IsNotEmpty({ message: 'Email requerido.' })
  readonly email: string;
}
