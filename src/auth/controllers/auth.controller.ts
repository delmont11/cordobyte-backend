import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { AuthResponseDto } from '../dtos/responses/auth-response.dto';
import { Request } from 'express';
// import { ForgotPasswordRequestDto } from '../dtos/requests/forgot-password-request.dto';
// import { ValidateTokenDto } from '../dtos/requests/validate-token-request.dto';
// import { ChangePasswordRequestDto } from '../dtos/requests/change-password-request.dto';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
// import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';
import { UserRegistrationRequestDto } from '../dtos/requests/user-registration-request.dto';
import { UserLoginRequestDto } from '../dtos/requests/user-login-request.dto';
import { ForgotPasswordRequestDto } from '../dtos/requests/forgot-password-request.dto';
import { ValidateTokenDto } from '../dtos/requests/validate-token-request.dto';
import { ChangePasswordRequestDto } from '../dtos/requests/change-password-request.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService
    ) {}

  @Post('sign-in')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOkResponse({
    type: AuthResponseDto,
    description: 'Inicio de sesión correcto.',
  })
  @ApiBadRequestResponse({
    description: 'Error en usuario y/o contraseña.',
  })
  @ApiUnprocessableEntityResponse({ description: 'Hay un problema con los datos ingresados' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async login(
    @Body() AuthRequestDto: UserLoginRequestDto,
  ): Promise<AuthResponseDto> {
    return this._authService.signIn(AuthRequestDto);
  }

  // @Post('login/admin')
  //   @UseInterceptors(ClassSerializerInterceptor)
  //   @HttpCode(HttpStatus.ACCEPTED)
  //   @ApiBadRequestResponse({
  //     description: 'Error en usuario y/o contraseña.',
  //   })
  //   @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  //   @ApiOkResponse({
  //     type: AuthResponseDto,
  //     description: 'Successfully user login',
  //   })
  //   async loginAdmin(
  //     @Body() AuthRequestDto: UserLoginRequestDto,
  //   ): Promise<AuthResponseDto> {
  //     return this._authService.signInAdmin(AuthRequestDto);
    // }

  // @Post('forgot-password')
  // @HttpCode(HttpStatus.CREATED)
  // @ApiOkResponse({
  //   description: 'Código enviado correctamente. Verifique su casilla de email.',
  // })
  // @ApiBadRequestResponse({ description: 'El email ingresado no existe.' })
  // @ApiUnprocessableEntityResponse({ description: 'Hay un problema con los datos ingresados' })
  // @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  // async forgotPassword(
  //   @Body() forgotPasswordDto: ForgotPasswordRequestDto,
  // ): Promise<any> {
  //   return this._authService.forgotPassword(forgotPasswordDto);
  // }

  // @Post('validate-token-password')
  // @HttpCode(HttpStatus.OK)
  // @ApiOkResponse({ description: 'Token válido.' })
  // @ApiNotAcceptableResponse({ description: 'Token inválido.' })
  // @ApiUnprocessableEntityResponse({ description: 'Hay un problema con los datos ingresados' })
  // @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  // async validateTokenPassword(@Body() body: ValidateTokenDto): Promise<any> {
  //   return this._authService.validateTokenSending(body);
  // }

  // @Post('change-password')
  // @HttpCode(HttpStatus.ACCEPTED)
  // @ApiOkResponse({ description: 'Contraseña modificada correctamente.' })
  // @ApiBadRequestResponse({ description: 'Token inválido' })
  // @ApiUnprocessableEntityResponse({ description: 'Hay un problema con los datos ingresados' })
  // @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  // async changePassword(@Body() body: ChangePasswordRequestDto) {
  //   return this._authService.changePassword(body);
  //   }

  // @Post('sign-out')
  // @UseGuards(AccessTokenGuard)
  // @HttpCode(HttpStatus.ACCEPTED)
  // @ApiBadRequestResponse({
  //   description: 'Error al cerrar sesión.',
  // })
  // @ApiOkResponse({ description: 'Cierre de sesión realizado con éxito.' })
  // @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  // async logout(@Req() req: Request) {
  //   return this._authService.logout(req.user['id']);
  // }
}
