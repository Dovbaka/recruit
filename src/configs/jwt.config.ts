import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs('jwt', () => {
  return {
    auth: {
      access: {
        privateKey: process.env.JWT_PRIVATE_KEY,
        publicKey: process.env.JWT_PUBLIC_KEY,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRES_IN,
          algorithm: 'RS256',
        },
      },
      refresh: {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        algorithm: 'HS256',
      },
    },
  } as Record<string, Record<string, JwtModuleOptions>>;
});
