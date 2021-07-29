import { EntityRepository, getManager, Repository } from 'typeorm';
import { UsuarioEntity } from '../entity/usuario.entity';

@EntityRepository(UsuarioEntity)
export class UsersRepository extends Repository<UsuarioEntity> {
  async custom() {
    return 1;
  }

  obtenerListaUsuarios(): Promise<UsuarioEntity[]> {
    return getManager()
      .getRepository(UsuarioEntity)
      .createQueryBuilder('usuario')
      .select([
        'usuario.id',
        'usuario.nombre',
        'usuario.apellido',
        'usuario.usuario',
        'usuario.cedula',
        'usuario.activo',
        'usuario.rol',
      ])
      .getMany();
  }
}
