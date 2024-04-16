import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { REFRESH_JWT } from '../consts.const';

@Injectable()
export class RefreshAuthGuard extends AuthGuard(REFRESH_JWT) {}
