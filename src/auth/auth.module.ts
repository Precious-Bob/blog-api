import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userentity } from './entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtStrategy } from 'src/strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Userentity]),
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, jwtStrategy],
})
export class AuthModule {}
