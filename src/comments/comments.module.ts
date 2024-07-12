import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { ArticlesEntity } from 'src/articles/entities/articles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userentity } from 'src/auth/entities/users.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CommentEntity } from './entities/comment.entity';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
    TypeOrmModule.forFeature([
      ArticlesEntity,
      CommentEntity,
      AuthModule,
    ]),
  ],
})
export class CommentsModule {}
