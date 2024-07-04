import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Userentity } from 'src/auth/entities/users.entity';
import { GetUser } from 'src/auth/user.decorator';
import { jwtGuard } from 'src/auth/guards';

@Controller('profiles')
export class ProfilesController {
  constructor(private userService: UsersService) {}

  @Get(':username')
  async findProfile(@Param('username') username: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) throw new NotFoundException();
    return { user };
  }

  @Post(':username/follow')
  @UseGuards(jwtGuard)
  async followUser(
    @GetUser() user: Userentity,
    @Param('username') username: string,
  ) {
    const profile = await this.userService.followUser(user, username);
    return { profile };
  }
  @Delete(':username/unfollow')
  @UseGuards(jwtGuard)
  async unfollowUser(
    @GetUser() user: Userentity,
    @Param('username') username: string,
  ) {
    const profile = await this.userService.unfollowUser(user, username);
    return { profile };
  }
}
