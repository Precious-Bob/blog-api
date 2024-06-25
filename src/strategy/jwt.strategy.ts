import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Userentity } from 'src/auth/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    @InjectRepository(Userentity) private userRepo: Repository<Userentity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: string; email: string }) {
    const user = await this.userRepo.findOne({
      where: {
        id: payload.sub,
      },
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }
  // async validate(payload: { sub: string; email: string }) {
  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       id: payload.sub,
  //     },
  //   });
  //   delete user.hash;
  //   return user;
}
