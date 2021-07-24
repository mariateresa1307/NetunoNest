import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UsuarioEntity } from './usuario.entity';

@Entity({ name: 'rol' })
export class RolEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  descripcion: string;
}
