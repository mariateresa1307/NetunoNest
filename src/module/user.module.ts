import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "../useCase/authenticacion/user.service";
import { JwtService } from "../useCase/authenticacion/jwt.service";
import { UserController } from "../controller/user.controller";
import { UsuarioEntity } from "../entity/usuario.entity";
import { AuthMiddleware } from "../middleware/auth.middleware";


@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  providers: [UserService, JwtService, ],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: "/api/usuario/login", method: RequestMethod.POST })
      .forRoutes(UserController);
  }
}
