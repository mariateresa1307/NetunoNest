import { IsNotEmpty } from 'class-validator';

export type UserDTO = {
  id: null | string;
  cedula: number;
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  clave: string;
  correo: string;
  rol: string;
  estaEnLinea: boolean;
  activo: boolean;
};

export class ListaDeUsuario {
  @IsNotEmpty()
  readonly page: number;

  @IsNotEmpty()
  readonly limit: number;
}
