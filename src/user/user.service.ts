import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getAllUser(): string {
    return 'user 1';
  }
}
