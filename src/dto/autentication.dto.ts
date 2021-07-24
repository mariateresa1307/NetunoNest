import { IsNotEmpty } from 'class-validator';

export class LoginUser {
  @IsNotEmpty()
  readonly usuario: string;

  @IsNotEmpty()
  readonly clave: string;
}

export class ListaDeUsuario {
  @IsNotEmpty()
  readonly page: number;

  @IsNotEmpty()
  readonly limit: number;
}
