import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private userService: UsersService) {}
  
  @Get(':username')
  async findProfile(@Param('username') username: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) throw new NotFoundException();
  }
}
