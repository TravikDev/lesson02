import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegistrationAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
}
