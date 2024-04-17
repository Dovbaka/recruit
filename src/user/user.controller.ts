import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from '../auth/decorators/public.decorators';

@Controller('recruit')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body('userData') userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Public()
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  uploadCv(@UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadPublicFilToS3(file);
  }

  @Delete('file/:id')
  removeCv(@Param('id') fileName: string) {
    return this.userService.removeFileFromS3(fileName);
  }
}
