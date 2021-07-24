import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutenticacionUseCase } from '../useCase/autenticacion';
import { Autenticacion } from '../controller/autenticacion.controller';
import { UsuarioEntity } from '../entity/usuario.entity';
import { AuthMiddleware } from '../middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  providers: [AutenticacionUseCase],
  controllers: [Autenticacion],
})
export class AutenticacionModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '/api/autenticacion/login', method: RequestMethod.POST })
      .forRoutes(Autenticacion);
  }
}
