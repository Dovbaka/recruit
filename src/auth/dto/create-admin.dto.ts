import { IsEmail, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
