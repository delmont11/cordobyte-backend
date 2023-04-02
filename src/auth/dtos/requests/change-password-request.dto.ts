import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';

export class ChangePasswordRequestDto {
  @ApiProperty()
  @IsString()
  @IsEmail({}, { message: 'Formato de Email inválido.' })
  @IsNotEmpty({ message: 'Email requerido.' })
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Token requerido.' })
  readonly token: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'contraseña requerida.' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  readonly password: string;

  @IsString()
  @MinLength(6)
  @Match('password', { message: 'La confirmación decontraseña no coincide.' })
  passwordConfirm: string;
}
