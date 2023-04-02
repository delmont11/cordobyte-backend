import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessTokenStrategy } from 'src/auth/strategies/accessToken.strategy';
import { RefreshTokenStrategy } from 'src/auth/strategies/refreshToken.strategy';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserTokensRepository, ResetTokensRepository } from './repositories';
import { ResetTokenEntity, UserTokenEntity } from './entities';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AddressEntity } from 'src/addresses/entities/address.entity';
import { ReportService } from 'src/reports/services/reports.service';
import { ReportEntity } from 'src/reports/entities/report.entity';
import { HashEntity } from 'src/reports/entities/hash.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // UserEntity, 
      ResetTokenEntity, 
      ResetTokenEntity, 
      ResetTokensRepository,
      UserTokenEntity,
      AddressEntity,
      ReportEntity,
      HashEntity
    ]),
    JwtModule.register({}),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // UsersModule,
    AuthModule,
  ],
  providers: [
    AuthService,
    ConfigService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    ReportService
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
