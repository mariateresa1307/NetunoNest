import { EntityRepository, Repository } from "typeorm";
import { UsuarioEntity } from "../../entity/usuario.entity";

@EntityRepository(UsuarioEntity)
export class UsersRepository extends Repository<UsuarioEntity> {
  async custom() {
    return 1;
  }
}
