import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
import { SECRET } from '../../../config';
import * as jwt from 'jsonwebtoken';
import { UsuarioEntity } from '../../entity/usuario.entity';
import { Repository } from 'typeorm';
import { LoginUserDTO } from 'src/dto/autentication.dto';
import * as argon2 from 'argon2';

@Injectable()
export class JwtService {
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
    correo,
    clave,
  }: LoginUserDTO): Promise<UsuarioEntity> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.rol', 'rol')
      .addSelect('user.clave')
      .where('correo = :correo', { correo })
      .getOne();

    if (!user) return null;
    if (await argon2.verify(user.clave, clave)) return user;
    return null;
  }
}
