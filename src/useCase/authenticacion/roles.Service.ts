import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolEntity } from '../../entity/rol.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolEntity)
    private RolRepository: Repository<RolEntity>,
  ) {}

  async obtenerRoles(): Promise<RolEntity[]> {
    return await this.RolRepository.find();
  }
}
