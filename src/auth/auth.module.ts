import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userentity } from './entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Userentity])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
