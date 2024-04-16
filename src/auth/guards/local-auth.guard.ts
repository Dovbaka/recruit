import { Injectable } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { LOCAL } from '../consts.const';

@Injectable()
export class LocalAuthGuard extends AuthGuard(LOCAL) {}
