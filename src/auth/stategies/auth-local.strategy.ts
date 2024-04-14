import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LOCAL } from '../consts.const';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthLocalStrategy extends PassportStrategy(Strategy, LOCAL) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  validate(email: string, password: string) {
    try {
      return this.authService.validate(email, password);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
