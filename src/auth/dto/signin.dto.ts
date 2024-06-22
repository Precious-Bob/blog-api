import { IsNotEmpty } from 'class-validator';

export class signinDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
