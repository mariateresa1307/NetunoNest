import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from '../../entity/usuario.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private userRepository: Repository<UsuarioEntity>,
  ) {}

  async findOneById(id: string): Promise<UsuarioEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async saveAndUpdate(payload: UsuarioEntity) {
    if (!payload.id) {
      payload.clave = await argon2.hash(payload.clave);
    }

    this.userRepository.save(payload);
  }
}
