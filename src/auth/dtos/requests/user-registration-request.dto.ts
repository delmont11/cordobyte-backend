import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { Match } from 'src/common/decorators/match.decorator';

export class UserRegistrationRequestDto {
  @AutoMap()
  uuid: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Nombre requerido.' })
  readonly firstName: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Apellido requerido.' })
  readonly lastName: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Contraseña requerida.' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  readonly password: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  @Match('password', { message: 'La confirmación decontraseña no coincide.' })
  passwordConfirm: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsEmail({}, { message: 'Formato de Email inválido.' })
  @IsNotEmpty({ message: 'Email requerido.' })
  readonly email: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Fecha de nacimiento requerida.' })
  readonly dateOfBirth: string;

  @AutoMap()
  @ApiProperty()
  @IsString({ message: 'Zona horaria requerida.' })
  @IsNotEmpty({ message: 'Zona horaria requerida.' })
  readonly defaultTimezone: string;

  @AutoMap()
  // @IsString()
  // @IsNotEmpty()
  readonly refreshToken: string;
}
