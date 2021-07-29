import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from '../../entity/usuario.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { UserDTO } from '../../dto/user.dto';
import {
  paginate,
  IPaginationOptions,
  IPaginationMeta,
} from 'nestjs-typeorm-paginate';

export interface UserLogin {
  token: string;
}

@Injectable()
export class UsuarioUseCase {
  constructor(
    @InjectRepository(UsuarioEntity)
    private userRepository: Repository<UsuarioEntity>,
  ) {}

  async obtenerDatasetPrincipal(
    options: IPaginationOptions,
  ): Promise<{
    items: UsuarioEntity[];
    meta: IPaginationMeta;
  }> {
    const queryBuilder = this.userRepository.createQueryBuilder('u');

    //.innerJoinAndSelect('u.id');
    //console.log(queryBuilder);
    const result = await paginate<UsuarioEntity>(queryBuilder, options);
    return {
      items: result.items,
      meta: result.meta,
    };
  }

  async findOneById(id: string): Promise<UsuarioEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async saveAndUpdate(payload: UserDTO) {
    const u = new UsuarioEntity();

    // aplica solo si es editar
    if (payload.id !== null) {
      u.id = payload.id;
    }
    u.clave = await argon2.hash(payload.clave);
    u.nombre = payload.nombre;
    u.apellido = payload.apellido;
    u.cedula = payload.cedula;
    u.usuario = payload.nombreUsuario;
    u.correo = payload.correo;
    u.rol = payload.rol;
    u.estaEnLinea = payload.estaEnLinea;
    u.activo = payload.activo;

    return await this.userRepository.save(u);
  }

  async obtenerCantidadDeUsuariosActivoseInactivos() {
    const [activos, inactivos] = await Promise.all([
      this.userRepository.count({ where: { estaEnLinea: true } }),
      this.userRepository.count({ where: { estaEnLinea: false } }),
    ]);

    return {
      activos,
      inactivos,
    };
  }
}
