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
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    @InjectRepository(Userentity) private userRepo: Repository<Userentity>,
  ) {}

  async signup(dto: signupDto) {
    try {
      const user = this.userRepo.create(dto);
      await user.save();
      console.log(user);
      return this.signToken(user.id, user.email);
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
      console.log(user);
      return this.signToken(user.id, user.email);
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

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '10m',
      secret: this.config.get('JWT_SECRET'),
    });
    return {
      access_token: token,
    };
  }
  // async signToken(
  //   userId: string,
  //   email: string,
  // ): Promise<{ access_token: string }> {
  //   const payload = {
  //     sub: userId,
  //     email,
  //   };
  //   const token = await this.jwt.signAsync(payload, {
  //     expiresIn: '60m',
  //     secret: this.config.get('JWT_SECRET'),
  //   });

  //   return {
  //     access_token: token,
  //   };
  // }
}
