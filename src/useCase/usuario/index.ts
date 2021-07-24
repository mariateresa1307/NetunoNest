import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from '../../entity/usuario.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { UserDTO } from '../../dto/user.dto';

export interface UserLogin {
  token: string;
}

@Injectable()
export class UsuarioUseCase {
  constructor(
    @InjectRepository(UsuarioEntity)
    private userRepository: Repository<UsuarioEntity>,
  ) {}

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

    this.userRepository.save(u);
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
