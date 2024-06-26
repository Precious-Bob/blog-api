import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userentity } from './entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtStrategy } from 'src/strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([Userentity]),
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, jwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
