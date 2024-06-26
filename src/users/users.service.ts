import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Userentity } from 'src/auth/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Userentity) private userRepo: Repository<Userentity>,
  ) {}

  async findByUsername(username: string): Promise<Userentity> {
    return this.userRepo.findOne({ where: { username } });
  }
}
