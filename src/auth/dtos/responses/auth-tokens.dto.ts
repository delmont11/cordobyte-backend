// import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class AuthTokensDto {
  @AutoMap()
  @ApiProperty()
  public accessToken: string;

  @AutoMap()
  @ApiProperty()
  public refreshToken: string;
}
