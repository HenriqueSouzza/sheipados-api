import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  id: number;

  @IsNotEmpty()
  name: string;

  username: string;

  @IsEmail()
  email: string;

  password: string;
}