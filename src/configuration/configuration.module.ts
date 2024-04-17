import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import aws from '../configs/aws.config';
import database from '../configs/database.config';
import jwt from '../configs/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database, jwt, aws],
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigurationModule {}
