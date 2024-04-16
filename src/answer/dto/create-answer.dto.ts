import { IsEnum, IsNumber, IsString } from 'class-validator';
import { CategoriesEnum } from '../../user/types/category.enum';

export class CreateAnswerDto {
  @IsString()
  question: string;

  @IsString()
  answerText: string;

  @IsNumber()
  answerValue: number;

  @IsEnum(CategoriesEnum)
  category: CategoriesEnum;

  @IsString()
  userId: string;
}
