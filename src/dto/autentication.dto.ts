import { IsNotEmpty } from 'class-validator';

export class LoginUser {
  @IsNotEmpty()
  readonly usuario: string;

  @IsNotEmpty()
  readonly clave: string;
}

export type UserLoginResponse = {
  token: string;
};
