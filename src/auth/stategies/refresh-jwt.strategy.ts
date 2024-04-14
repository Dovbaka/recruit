import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { REFRESH_JWT } from '../consts.const';
import { AdminService } from '../../admin/admin.service';
import { JwtPayloadType } from '../types/jwt-payload.type';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  REFRESH_JWT,
) {
  constructor(private adminService: AdminService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      //TODO: Implement through config service
      secretOrKey: process.env.JWT_REFRESH_SECRET,
    });
  }

  validate(payload: JwtPayloadType) {
    try {
      //TODO: Save refresh token's hash in DB to check if it's not duplicated
      return this.adminService.findOne(payload.adminId);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
