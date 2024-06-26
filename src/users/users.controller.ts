import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUser } from 'src/auth/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { jwtGuard } from 'src/auth/guards';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(jwtGuard)
  // the custom GetUser decorator fetches the user details from the jwt token (made global in the auth module)
  findCurrentuser(@GetUser() username: string) {
    return this.usersService.findByUsername(username);
  }
}
