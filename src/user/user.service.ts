import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private configService: ConfigService,
  ) {}

  create(createUserDto: CreateUserDto) {
    const userInst = this.userRepository.create(createUserDto);
    return this.userRepository.save(userInst);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    //TODO: find way to transform numeric back to number
    const result = await this.userRepository
      .createQueryBuilder()
      .update({
        ...updateUserDto,
      })
      .where({
        id,
      })
      .returning('*')
      .execute();
    return result.raw[0];
  }

  async remove(id: string) {
    return await this.userRepository
      .createQueryBuilder()
      .delete()
      .from(UserEntity)
      .where('id = :id', { id })
      .execute();
  }

  async uploadPublicFilToS3(file: Express.Multer.File) {
    const s3 = new S3();
    return await s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: file.buffer,
        Key: `${uuid()}_${file.originalname}`,
        ContentDisposition: 'inline',
        ContentType: 'application/pdf',
      })
      .promise();
  }

  async removeFileFromS3(fileName: string) {
    if (!fileName) {
      return;
    }

    const fileParams = {
      Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
      Key: fileName,
    };
    const s3 = new S3();
    return await s3
      .headObject(fileParams)
      .promise()
      .then(
        async () =>
          await s3
            .deleteObject(fileParams)
            .promise()
            .then(() => console.log('file deleted Successfully'))
            .catch((err) =>
              console.log('ERROR in file Deleting : ' + JSON.stringify(err)),
            ),
      )
      .catch((err) => err);
  }
}
