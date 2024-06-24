import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { signinDto } from './signin.dto';

export class signupDto extends signinDto {
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(2)
  username: string;
}
