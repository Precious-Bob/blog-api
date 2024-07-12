import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { ArticlesEntity } from 'src/articles/entities/articles.entity';
import { Userentity } from 'src/auth/entities/users.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,
    @InjectRepository(ArticlesEntity)
    private readonly articleRepo: Repository<ArticlesEntity>,
  ) {}

  async createComment(user: Userentity, data: CreateCommentDto) {
    const comment = this.commentRepo.create(data);
    comment.author = user;
    await comment.save();
    return this.commentRepo.findOne({ where: { body: data.body } });
  }

  findByArticleSlug(slug: string) {
    return this.articleRepo.find({ where: { slug: slug } });
  }

  async deleteComment(user: Userentity, id: string) {
    const comment = await this.commentRepo.findOne({
      where: { id, author: user },
    });
  }
}
