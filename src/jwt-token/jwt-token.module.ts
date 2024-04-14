import { Module } from '@nestjs/common';
import { JwtTokenService } from './jwt-token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  //TODO: Config module
  providers: [JwtTokenService],
  exports: [JwtTokenService],
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const result = configService.get('jwt.auth.access');
        if (!result) {
          throw new Error('Provide JWT options.');
        }
        return result;
      },
      inject: [ConfigService],
    }),
  ],
})
export class JwtTokenModule {}
