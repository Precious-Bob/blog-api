import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userentity } from 'src/auth/entities/users.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ProfilesController } from './profiles.controller';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Userentity])],
  controllers: [UsersController, ProfilesController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}