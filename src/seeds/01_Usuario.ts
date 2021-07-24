import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UsuarioEntity } from '../entity/usuario.entity';

import * as argon2 from 'argon2';

export default class Usuario implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(UsuarioEntity)
      .values([
        {
          nombre: 'admin',
          apellido: 'admin',
          cedula: 12345678,
          usuario: 'admin',
          clave: await argon2.hash('1234'),
        },
      ])
      .execute();
  }
}
