import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUser } from 'src/auth/user.decorator';
import { jwtGuard } from 'src/auth/guards';
import { Userentity } from 'src/auth/entities/users.entity';
import { UpdateUserDto } from 'src/auth/dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(jwtGuard)
  // the custom GetUser decorator fetches the user details from the jwt token (made global in the auth module)
  // findCurrentuser(@GetUser() { username }: Userentity) {
  //   return this.usersService.findByUsername(username)};
  findCurrentUser(@GetUser() { username }: Userentity) {
    return this.usersService.findByUsername(username);
  }

  @Put('me')
  @UseGuards(jwtGuard)
  updateCurrentUser(@GetUser() user: Userentity, @Body() dto: UpdateUserDto) {
    return this.usersService.updateCurrentUser(user.id, dto);
  }
}

