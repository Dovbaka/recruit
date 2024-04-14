import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT } from '../consts.const';
import { AdminService } from '../../admin/admin.service';
import { JwtPayloadType } from '../types/jwt-payload.type';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy, JWT) {
  constructor(private adminService: AdminService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //TODO: Implement through config service
      secretOrKey: process.env.JWT_PUBLIC_KEY,
      algorithms: ['RS256'],
    });
  }

  validate(payload: JwtPayloadType) {
    try {
      return this.adminService.findOne(payload.adminId);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
