import { Module } from '@nestjs/common';
import { AppModule as helloWord } from './helloWord/app.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [helloWord, UserModule],
})
export class AppModule {}
