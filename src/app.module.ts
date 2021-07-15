import { Module } from '@nestjs/common';
import { AppModule as helloWord } from './helloWord/app.module';
import generalModules from './module';

@Module({
  imports: [helloWord, ...generalModules],
})
export class AppModule {}
