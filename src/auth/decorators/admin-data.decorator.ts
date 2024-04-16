import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminEntity } from '../../admin/entities/admin.entity';
import { CustomRequest } from '../types/custom-request.type';

export const AdminData = createParamDecorator(
  (_data: unknown, ectx: ExecutionContext): AdminEntity => {
    const ctx = ectx.switchToHttp();
    const req = ctx.getRequest<CustomRequest>();
    const admin = req.user;
    if (!admin) throw new UnauthorizedException();
    return admin;
  },
);
