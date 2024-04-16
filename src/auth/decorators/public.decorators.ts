import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC } from '../consts.const';

export const Public = (isPublic = true) => {
  return SetMetadata(IS_PUBLIC, isPublic);
};
