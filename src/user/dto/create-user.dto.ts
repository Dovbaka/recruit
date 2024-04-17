import { IsEmail, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsNumber()
  role: number;

  @IsString()
  status: string;

  @IsString()
  @IsUrl()
  cvUrl: string;

  @IsString()
  comment: string;

  @IsNumber()
  experience: number;

  @IsNumber()
  qualification: number;

  @IsNumber()
  selfSufficiency: number;

  @IsNumber()
  stressTolerance: number;

  @IsNumber()
  communicability: number;

  @IsNumber()
  creativity: number;

  @IsNumber()
  rationality: number;
}
