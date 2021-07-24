import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from '../../entity/usuario.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import {
  paginate,
  IPaginationOptions,
  IPaginationMeta,
} from 'nestjs-typeorm-paginate';
import { UserDTO } from '../../dto/user.dto';

@Injectable()
export class UserService {
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
    queryBuilder.innerJoinAndSelect('u.rol', 'rol');
    const result = await paginate<UsuarioEntity>(queryBuilder, options);

    return {
      items: result.items,
      meta: result.meta,
    };
  }
  async save(user: UsuarioEntity) {
    return this.userRepository.save(user);
  }
  async findOneById(id: string): Promise<UsuarioEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async saveAndUpdate(payload: UserDTO) {
    const u = new UsuarioEntity();

    if (payload.id !== null) {
      // aplica solo si es editar
      u.id = payload.id;
    }
    u.clave = await argon2.hash(payload.clave);
    u.nombre = payload.nombre;
    u.apellido = payload.apellido;
    u.cedula = payload.cedula;
    u.usuario = payload.nombreUsuario;

    this.userRepository.save(u);
  }

  async obtenerCantidadDeUsuariosActivoseInactivos() {
    //throw new Error('ERROR'); probar error
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
