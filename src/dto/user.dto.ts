import { IsNotEmpty } from 'class-validator';

export type UserDTO = {
  id: null | string;
  cedula: number;
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  clave: string;
};

export class ListaDeUsuario {
  @IsNotEmpty()
  readonly page: number;

  @IsNotEmpty()
  readonly limit: number;
}
