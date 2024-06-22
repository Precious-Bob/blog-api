import { Injectable } from '@nestjs/common';
import { signinDto, signupDto } from './dto';
@Injectable()
export class AuthService {
  signup(signupDto: signupDto) {
    return signupDto;
  }

  signin(signinDto: signinDto) {
    return signinDto;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
