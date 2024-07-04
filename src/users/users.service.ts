import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Userentity } from 'src/auth/entities/users.entity';
import { UpdateUserDto } from './dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Userentity) private userRepo: Repository<Userentity>,
  ) {}

  async findByUsername(username: string): Promise<Userentity> {
    return this.userRepo.findOneOrFail({ where: { username } });
  }
  // This method finds by ID
  // async updateCurrentUser(id: string, dto: UpdateUserDto) {
  //   const updatedUser = await this.userRepo.update(id, dto);
  //   console.log( { success: updatedUser.affected > 0 })
  //   return this.findCurrentUser(id);

  async findAllUsers(): Promise<Userentity[]> {
    return await this.userRepo.find();
  }

  async updateCurrentUser(username: string, dto: UpdateUserDto) {
    const updatedUser = await this.userRepo.update(username, dto);
    console.log({ success: updatedUser.affected > 0 });
    return this.findByUsername(username);
  }

  async followUser(currentUser: Userentity, username: string) {
    const user = await this.userRepo.findOne({
      where: { username },
      relations: ['followers'],
    });
    user.followers.push(currentUser);
    await user.save();
    return user.toProfile(currentUser);
  }

  async unfollowUser(currentUser: Userentity, username: string) {
    const user = await this.userRepo.findOne({
      where: { username },
      relations: ['followers'],
    });
    user.followers = user.followers.filter(
      (follower) => follower !== currentUser,
    );
    await user.save();
    return user.toProfile(currentUser);
  }
}
