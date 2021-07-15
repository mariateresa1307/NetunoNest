import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { NestMiddleware, HttpStatus, Injectable } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { SECRET } from "../../config";
import { UsuarioEntity } from "../entity/usuario.entity";
import { getManager } from "typeorm";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private manager = getManager();

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeaders = req.headers.authorization;
      if (authHeaders && (authHeaders as string).split(" ")[1]) {
        const token = (authHeaders as string).split(" ")[1];

        const decoded: any = jwt.verify(token, SECRET);
        const user = await this.manager.findOneOrFail(UsuarioEntity, { where: { id: decoded.id } });
        if (!user) throw new Error();
        next();
      } else {
        throw new Error();
      }
    } catch (error) {
      const authHeaders = req.headers.authorization;
      if (authHeaders && (authHeaders as string).split(" ")[1]) {
        const token = (authHeaders as string).split(" ")[1];

        const decoded: any = jwt.decode(token);
        const user = await this.manager.findOneOrFail(UsuarioEntity, { where: { id: decoded.id } });
        user.estaEnLinea = false;

        await this.manager.save(user);
      }

      throw new HttpException("Not authorized", HttpStatus.UNAUTHORIZED);
    }
  }
}
