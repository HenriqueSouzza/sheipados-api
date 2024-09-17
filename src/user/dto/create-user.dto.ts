import { IsEmail, IsEmpty, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  id: number;

  @IsNotEmpty()
  name: string;

  @IsEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 24)
  password: string;
}