import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AnswerEntity } from './entities/answer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(AnswerEntity)
    private answerRepository: Repository<AnswerEntity>,
    private readonly userService: UserService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    createAnswerDtoArray: CreateAnswerDto[],
  ) {
    const userInst = await this.userService.create(createUserDto);
    const answerDates = createAnswerDtoArray.map((item) => ({
      ...item,
      userId: userInst.id,
    }));
    const answerArr = this.answerRepository.create(answerDates);
    return this.answerRepository.save(answerArr);
  }

  findAll() {
    return `This action returns all answer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
