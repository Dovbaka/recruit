import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const result = configService.get<TypeOrmModuleOptions>('database');
        if (!result) {
          throw new Error('Provide Database options.');
        }

        return result;
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
