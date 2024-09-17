import { IsNotEmpty, MinLength } from "class-validator"

export class LoginDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  @MinLength(10)
  password: string
}