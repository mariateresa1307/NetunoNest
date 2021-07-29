import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioUseCase } from '../useCase/usuario';
import { UserController } from '../controller/user.controller';
import { UsuarioEntity } from '../entity/usuario.entity';
import { AuthMiddleware } from '../middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  providers: [UsuarioUseCase],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({
        path: '/api/usuario',
        method: RequestMethod.POST,
      })
      .forRoutes(UserController);
  }
}
