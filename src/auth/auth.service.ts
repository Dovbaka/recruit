import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminEntity } from '../admin/entities/admin.entity';
import { AdminService } from '../admin/admin.service';
import * as bcrypt from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import { LoginDto } from './dto/login.dto';
import { validate } from 'class-validator';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtTokenService: JwtTokenService,
  ) {}

  async validate(email: string, password: string) {
    const loginDto = plainToInstance(LoginDto, { email, password });
    const errors = await validate(loginDto);
    errors.forEach((item) => {
      throw new BadRequestException(item);
    });
    const adminItem = await this.adminService.findOneByEmail(email);
    if (!adminItem) {
      throw new UnauthorizedException(
        'Account with these credentials does not exist',
      );
    }

    const passwordEquals = await bcrypt.compare(password, adminItem.password);

    if (!passwordEquals) {
      throw new UnauthorizedException('Email or password is wrong');
    }
    return adminItem;
  }

  async login(adminData: AdminEntity) {
    return this.generateTokens(adminData);
  }

  async refresh(adminData: AdminEntity) {
    return this.generateTokens(adminData);
  }

  private async generateTokens(adminData: AdminEntity) {
    const access = this.jwtTokenService.generateAccessToken({
      adminId: adminData.id,
    });
    //TODO: Save refresh token's hash in DB to check if it's not duplicated
    const refresh = this.jwtTokenService.generateRefreshToken({
      adminId: adminData.id,
    });
    return {
      access,
      refresh,
    };
  }

  async create(createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }
}
