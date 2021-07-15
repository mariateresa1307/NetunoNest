import { Controller, Get, Post, Body, Query, Headers } from "@nestjs/common";
import { UserService } from "../useCase/authenticacion/user.service";
import { JwtService } from "../useCase/authenticacion/jwt.service";
import * as jwt from "jsonwebtoken";
import { SECRET } from "../../config";
import { Logger } from "@nestjs/common";
import { UsuarioEntity } from "../entity/usuario.entity";

@Controller("usuario")
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    
  ) {}

  @Get()
  async obtenerInformacionDelUsuario(@Headers() headers): Promise<any> {
    const authHeaders = headers.authorization;
    const token = (authHeaders as string).split(" ")[1];

    const decoded: any = jwt.verify(token, SECRET);
    return await this.userService.findOneById(decoded.id);
  }

  @Post()
  async guardarYActualizar(@Body() payload: UsuarioEntity) {
    this.userService.saveAndUpdate(payload);
  }

  @Post("login")
  async login()  {
  

    return "hola isei"
  }



}
