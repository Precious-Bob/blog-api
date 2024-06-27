import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from 'src/auth/dto';
import { Userentity } from 'src/auth/entities/users.entity';
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

  async updateCurrentUser(username: string, dto: UpdateUserDto) {
    const updatedUser = await this.userRepo.update(username, dto);
    console.log( { success: updatedUser.affected > 0 })
    return this.findByUsername(username);

  }


}
