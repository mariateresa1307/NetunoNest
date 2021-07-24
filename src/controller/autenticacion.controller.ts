import { Controller, Post, Body } from '@nestjs/common';
import { LoginUser, UserLoginResponse } from '../dto/autentication.dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { AutenticacionUseCase } from '../useCase/autenticacion';

@Controller('autenticacion')
export class Autenticacion {
  constructor(private readonly autenticacionUseCase: AutenticacionUseCase) {}

  @Post('login')
  async login(@Body() loginUserData: LoginUser): Promise<UserLoginResponse> {
    const _user = await this.autenticacionUseCase.findOneBycredentials(
      loginUserData,
    );
    const errors = { message: ' User not found' };
    if (!_user) throw new HttpException(errors, 401);
    const token = this.autenticacionUseCase.generateJWT(_user);

    await this.autenticacionUseCase.save(_user);
    return { token };
  }
}
