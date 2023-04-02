import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { AuthTokensDto } from './auth-tokens.dto';

export class AuthResponseDto {
  @AutoMap()
  @ApiProperty()
  public tokens: AuthTokensDto;
}
