import { AdminEntity } from '../../admin/entities/admin.entity';
import { Request } from 'express';

export type CustomRequest = Request & {
  user?: AdminEntity;
};
