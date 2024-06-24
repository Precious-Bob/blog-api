import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { signinDto, signupDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Userentity } from './entities/users.entity';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Userentity) private userRepo: Repository<Userentity>,
  ) {}

  async signup(dto: signupDto) {
    try {
      const user = this.userRepo.create(dto);
      await user.save();
      return user;
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('Credentials already exists');
      }
      throw e;
    }
  }

  // async signup({ email, firstName, lastName, password }: SignupDto) {
  //   try {
  //     const hash = await argon.hash(password);
  //     const user = await this.prisma.user.create({
  //       data: {
  //         firstName,
  //         lastName,
  //         email,
  //         hash,
  //       },
  //     });
  //     return this.signToken(user.id, user.email);
  //   } catch (e) {
  //     if (e instanceof PrismaClientKnownRequestError) {
  //       if (e.code === 'P2002') {
  //         throw new ConflictException('Credentials already exists');
  //       }
  //     }
  //     throw e;
  //   }
  // }

  async signin({ email, password }: signinDto) {
    try {
      const user = await this.userRepo.findOne({ where: { email } });
      if (!user) throw new NotFoundException('Credentials incorrect');

      const validPassword = await argon.verify(user.password, password);
      if (!validPassword) throw new NotFoundException('Credentials incorrect');
      return user;
    } catch (e) {
      throw e;
    }
    // async signin({ email, password }: SigninDto) {
    //   // Find the user by email
    //   const user = await this.prisma.user.findUnique({
    //     where: {
    //       email: email,
    //     }/., ,
    //   });
    //   // If user doesn't exist, throw exception
    //   if (!user) throw new NotFoundException('Credentials incorrect');
    //   // Compare password
    //   const validPassword = await argon.verify(user.hash, password);

    //   // If password incorrect throw exception
    //   if (!validPassword) throw new NotFoundException('Credentials incorrect');
    //   return this.signToken(user.id, user.email);
    // }
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
