import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AuthJwtStrategy } from './stategies/auth-jwt.strategy';
import { AuthService } from './auth.service';
import { AdminModule } from '../admin/admin.module';
import { JwtTokenModule } from '../jwt-token/jwt-token.module';
import { AuthController } from './auth.controller';
import { AuthLocalStrategy } from './stategies/auth-local.strategy';
import { RefreshJwtStrategy } from './stategies/refresh-jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CheckAuthGuard,
    },
    AuthJwtStrategy,
    AuthLocalStrategy,
    RefreshJwtStrategy,
    AuthService,
  ],
  imports: [AdminModule, JwtTokenModule],
})
export class AuthModule {}
