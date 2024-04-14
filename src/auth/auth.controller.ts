import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Public } from './decorators/public.decorators';
import { AdminData } from './decorators/admin-data.decorator';
import { AdminEntity } from '../admin/entities/admin.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@AdminData() adminData: AdminEntity) {
    return this.authService.login(adminData);
  }

  @Public()
  @Post('register')
  register(@Body() adminData: CreateAdminDto) {
    return this.authService.create(adminData);
  }

  @Public()
  @Post('refresh')
  @UseGuards(RefreshAuthGuard)
  refreshToken(@AdminData() adminData: AdminEntity) {
    return this.authService.refresh(adminData);
  }
}
