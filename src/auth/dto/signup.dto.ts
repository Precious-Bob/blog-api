import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class signupDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
