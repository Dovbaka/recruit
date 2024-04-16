import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from './entities/admin.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const exists = await this.adminRepository.findOne({
      where: { email: createAdminDto.email },
    });
    if (exists) return new BadRequestException('Account already exists');
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
    const admin = this.adminRepository.create({
      ...createAdminDto,
      password: hashedPassword,
    });
    return this.adminRepository.save(admin);
  }

  findOne(id: string) {
    return this.adminRepository.findOne({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.adminRepository.findOne({ where: { email } });
  }
}
