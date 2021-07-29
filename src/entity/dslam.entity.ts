import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'dslam' })
export class DslamEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  dslam: string;

  @Column()
  nodo: string;

  @Column()
  capacidad: string;

  @Column()
  descripcion: string;

  @Column()
  tarjeta: number;

  @Column()
  puerto: number;

  @Column()
  estatus: string;
}
