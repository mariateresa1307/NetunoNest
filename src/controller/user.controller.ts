import { Controller, Get, Post, Body, Query, Headers } from '@nestjs/common';
import { UserService } from '../useCase/authenticacion/user.service';
import { JwtService } from '../useCase/authenticacion/jwt.service';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '../../config';
import { Logger } from '@nestjs/common';
import { UsuarioEntity } from '../entity/usuario.entity';
import { LoginUser, ListaDeUsuario } from '../dto/autentication.dto';
import { UserLoginIN } from '../interface/user.interface';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { UserDTO } from 'src/dto/user.dto';

@Controller('usuario')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  async obtenerInformacionDelUsuario(@Headers() headers): Promise<any> {
    const authHeaders = headers.authorization;
    const token = (authHeaders as string).split(' ')[1];

    const decoded: any = jwt.verify(token, SECRET);
    return await this.userService.findOneById(decoded.id);
  }

  @Post()
  async guardarYActualizar(@Body() payload: UserDTO) {
    await this.userService.saveAndUpdate(payload);
  }

  @Post('login')
  async login(@Body() loginUserData: LoginUser): Promise<UserLoginIN> {
    const _user = await this.jwtService.findOneBycredentials(loginUserData);
    const errors = { message: ' User not found' };
    if (!_user) throw new HttpException(errors, 401);
    const token = this.jwtService.generateJWT(_user);

    await this.userService.save(_user);
    console.log('esto funciona');
    return {
      usuario: _user.usuario,

      token,
    };
  }

  @Get('listaDeUsuarios')
  async listaDeUsuario(@Query() params: ListaDeUsuario) {
    return await this.userService.obtenerDatasetPrincipal(params);
  }

  @Get('obtenerCantidadPorEstado')
  async obtenerCantidadDeUsuariosActivoseInactivos() {
    return await this.userService.obtenerCantidadDeUsuariosActivoseInactivos();
  }
}
