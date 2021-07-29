import { Controller, Post, Body } from '@nestjs/common';
import { LoginUser, UserLoginResponse } from '../dto/autentication.dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { AutenticacionUseCase } from '../useCase/autenticacion';
import { Req } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '../../config';

@Controller('autenticacion')
export class Autenticacion {
  constructor(private readonly autenticacionUseCase: AutenticacionUseCase) {}

  @Post('login')
  async login(@Body() loginUserData: LoginUser): Promise<UserLoginResponse> {
    const _user = await this.autenticacionUseCase.findOneBycredentials(
      loginUserData,
    );
    const errors = { message: ' User not found' };
    if (!_user || _user.activo === false) throw new HttpException(errors, 401);
    const token = this.autenticacionUseCase.generateJWT(_user);
    _user.estaEnLinea = true;
    await this.autenticacionUseCase.save(_user);
    return { token };
  }
  @Post('logout')
  async logOut(@Req() req: Request): Promise<void> {
    //  console.log('aquic');
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];

      const decoded: any = jwt.verify(token, SECRET);
      console.log(decoded);

      await this.autenticacionUseCase.logOut(decoded.id);
    }
  }
}
