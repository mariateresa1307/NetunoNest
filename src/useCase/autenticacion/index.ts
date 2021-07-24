import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
import { SECRET } from '../../../config';
import * as jwt from 'jsonwebtoken';
import { UsuarioEntity } from '../../entity/usuario.entity';
import { Repository } from 'typeorm';
import { LoginUser } from 'src/dto/autentication.dto';
import * as argon2 from 'argon2';

export interface UserLogin {
  token: string;
}

@Injectable()
export class AutenticacionUseCase {
  constructor(
    @InjectRepository(UsuarioEntity)
    private userRepository: Repository<UsuarioEntity>,
  ) {}

  generateJWT(user: UsuarioEntity): string {
    return jwt.sign(
      {
        id: user.id,
        exp: DateTime.local().plus({ month: 1 }).toMillis(),
      },
      SECRET,
    );
  }

  async findOneBycredentials({
    usuario,
    clave,
  }: LoginUser): Promise<UsuarioEntity> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.clave')
      .where('usuario = :usuario', { usuario })
      .getOne();

    if (!user) return null;
    if (await argon2.verify(user.clave, clave)) return user;
    return null;
  }

  async save(user: UsuarioEntity) {
    return this.userRepository.save(user);
  }
}
