import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { NODE_ENV } from './constants/app.constant';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ReportsModule } from './reports/reports.module';
import { AddressesModule } from './addresses/addresses.module';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    // TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      /* Joi es una libreria para validaciones */
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        NODE_ENV: Joi.string()
          .required()
          .valid(NODE_ENV.DEVELOPMENT, NODE_ENV.PRODUCTION),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required().allow(''),
        POSTGRES_DB: Joi.string().required(),
      }),
      isGlobal: true,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    /* Aqui van todos los modulos */
    DatabaseModule,
    AuthModule,
    JwtModule.register({}),
    ReportsModule,
    AddressesModule
  ],
  providers: [AppService],
})
export class AppModule {}
