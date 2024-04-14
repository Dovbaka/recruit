import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtTokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  generateAccessToken(payload: Record<string, any>) {
    return this.jwtService.sign(payload, {
      privateKey: this.configService.get('jwt.auth.access.privateKey'),
      expiresIn: this.configService.get(
        'jwt.auth.access.signOptions.expiresIn',
      ),
      algorithm: this.configService.get(
        'jwt.auth.access.signOptions.algorithm',
      ),
    });
  }

  generateRefreshToken(payload: Record<string, any>) {
    return this.jwtService.sign(payload, {
      privateKey: this.configService.get('jwt.auth.refresh.secret'),
      expiresIn: this.configService.get('jwt.auth.refresh.expiresIn'),
      algorithm: this.configService.get('jwt.auth.refresh.algorithm'),
    });
  }
}
