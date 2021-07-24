import * as jwt from 'jsonwebtoken';
import { SECRET } from '../../config';

interface customJWTPayload extends jwt.JwtPayload {
  id: string;
}

export const getCurrentUserByJWT = (
  authorization: string,
): customJWTPayload => {
  return jwt.verify(authorization.split(' ')[1], SECRET) as customJWTPayload;
};
