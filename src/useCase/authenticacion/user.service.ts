import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioEntity } from "../../entity/usuario.entity";
import { Repository } from "typeorm";
import { paginate, IPaginationOptions, IPaginationMeta } from "nestjs-typeorm-paginate";
import * as argon2 from "argon2";

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
    const queryBuilder = this.userRepository.createQueryBuilder("u");
    queryBuilder.innerJoinAndSelect("u.rol", "rol");

    const result = await paginate<UsuarioEntity>(queryBuilder, options);

    return {
      items: result.items,
      meta: result.meta,
    };
  }

  async findOneById(id: string): Promise<UsuarioEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async saveAndUpdate(payload: UsuarioEntity) {
    if (!payload.id) {
      payload.clave = await argon2.hash(payload.clave);
    }

    this.userRepository.save(payload);
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
