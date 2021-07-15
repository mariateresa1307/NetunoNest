import { Module } from '@nestjs/common';
import generalModules from './module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), ConfigModule.forRoot(), ...generalModules],
})
export class AppModule {}
