import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { GetUser } from 'src/auth/user.decorator';
import { Userentity } from 'src/auth/entities/users.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('slug/comments')
  async findComments(@Param('slug') slug: string) {
    const comments = await this.commentsService.findByArticleSlug(slug);
    return { comments };
  }

  @Post(':slug/comments')
  async createComment(
    @GetUser() user: Userentity,
    @Body() data: { comment: CreateCommentDto },
  ) {
    const comment = await this.commentsService.createComment(
      user,
      data.comment,
    );
    return { comment };
  }

  async deleteComment(@GetUser() user: Userentity, @Param('id') id: string) {
    const comment = await this.commentsService.deleteComment(user, id);
    return { comment };
  }
}
