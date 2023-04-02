import { Injectable, BadRequestException, HttpException, HttpStatus, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AuthTokensDto } from '../dtos/responses/auth-tokens.dto';
import { JwtService } from '@nestjs/jwt';
import { UserLoginRequestDto } from '../dtos/requests/user-login-request.dto';
import { ResetTokenEntity, UserTokenEntity } from '../entities';
import { ValidateTokenDto } from '../dtos/requests/validate-token-request.dto';
import { hashPassword } from 'src/common/utils/hash-password.utility';
import { ReportService } from 'src/reports/services/reports.service';
import { AddressEntity } from 'src/addresses/entities/address.entity';

@Injectable()
export class AuthService {
  constructor(
    private _configService: ConfigService,
    @InjectRepository(UserTokenEntity)
    private readonly _userTokensRepository: Repository<UserTokenEntity>,
    @InjectRepository(AddressEntity)
    private readonly _AddressRepository: Repository<AddressEntity>,
    @InjectRepository(ResetTokenEntity)
    private _resetTokensRepository: Repository<ResetTokenEntity>,
    private _jwtService: JwtService,
    private _reportService: ReportService,
  ) {}

  async signIn(data: UserLoginRequestDto) {

    const { address } = data;

    let addressFound;

    addressFound = await this._AddressRepository.findOne({
      where: {
        address: address,
      },
    });

    if (!addressFound) {
      const newAddress = await this._AddressRepository.save({
        address: address,
      })

      addressFound = newAddress;
    }



    const tokens = await this.getTokens(
      addressFound.id,
      data.address,
    );
    await this.updateRefreshToken(addressFound.id, tokens.refreshToken);

    return {
      tokens: tokens,
    };
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  // async logout(userId: string) {
  //   await this._usersRepository.update(userId, { refreshToken: null });
  //   return {
  //     statusCode: 200,
  //     message: 'Cierre de sesión realizado con éxito.',
  //   };
  // }

  async getTokens(
    id: number,
    address: string,
  ): Promise<AuthTokensDto> {
    const [accessToken, refreshToken] = await Promise.all([
      this._jwtService.signAsync(
        {
          id: id,
          address: address,
        },
        {
          secret: this._configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '1d',
        },
      ),
      this._jwtService.signAsync(
        {
          id: id,
          address: address,
        },
        {
          secret: this._configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(address_id: number, refreshToken: string) {
    const hashedRefreshToken = await hashPassword(refreshToken);
    await this._AddressRepository.update(address_id, {
      refreshToken: hashedRefreshToken,
    });
  }

    // async signInAdmin(data: UserLoginRequestDto) {
    //   // Check if user exists
    //   const user = await this._users.findOne({
    //     where: {
    //       email: data.email,
    //       role_id: 1,
    //     },
    //   });

    //   if (!user) throw new BadRequestException('El usuario no existe.');
    //   const passwordMatches = await argon2.verify(user.password, data.password);
    //   if (!passwordMatches)
    //     throw new BadRequestException('Contraseña incorrecta.');

    //   const tokens = await this.getTokens(
    //     user.id,
    //     user.firstName + user.lastName,
    //     user.role_id,
    //     user.email,
    //   );
    //   await this.updateRefreshToken(user.id, tokens.refreshToken, user.email);

    //   return {
    //     tokens: tokens,
    //     user: user,
    //   };
    // }

}
