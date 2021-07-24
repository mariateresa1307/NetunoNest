import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RolEntity } from './rol.entity';
@Entity({ name: 'usuario' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  cedula: number;

  @Column()
  usuario: string;

  @Column({ select: false })
  clave: string;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  creado: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  actualizado: Date;

  @Column({ default: false })
  estaEnLinea: boolean;
}
