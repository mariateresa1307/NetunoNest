import { IsNotEmpty } from "class-validator";

export class LoginUserDTO {
  @IsNotEmpty()
  readonly correo: string;

  @IsNotEmpty()
  readonly clave: string;
}

export class ListaDeUsuarioDTO {
  @IsNotEmpty()
  readonly page: number;

  @IsNotEmpty()
  readonly limit: number;
}
