import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userentity } from 'src/auth/entities/users.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Userentity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
