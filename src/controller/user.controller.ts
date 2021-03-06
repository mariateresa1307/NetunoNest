import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { UsuarioUseCase } from '../useCase/usuario';
import { getCurrentUserByJWT } from '../helpers/jwt.helper';
import { Logger } from '@nestjs/common';
import { UserDTO } from 'src/dto/user.dto';
import { UsuarioEntity } from '../entity/usuario.entity';
import { ListaDeUsuario } from '../dto/user.dto';

@Controller('usuario')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly usuarioUseCase: UsuarioUseCase) {}

  @Get()
  async obtenerInformacionDelUsuario(
    @Headers() headers,
  ): Promise<UsuarioEntity> {
    const decodedToken = getCurrentUserByJWT(headers.authorization);
    //console.log('aqui');
    return await this.usuarioUseCase.findOneById(decodedToken.id);
  }

  @Post()
  async guardarYActualizar(@Body() payload: UserDTO) {
    await this.usuarioUseCase.saveAndUpdate(payload);
  }

  @Get('obtenerCantidadPorEstado')
  async obtenerCantidadDeUsuariosActivoseInactivos() {
    return await this.usuarioUseCase.obtenerCantidadDeUsuariosActivoseInactivos();
  }

  @Get('listaDeUsuarios')
  async listaDeUsuario(@Body() params: ListaDeUsuario) {
    //console.log('aqui');
    return await this.usuarioUseCase.obtenerDatasetPrincipal(params);
  }
}
