import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userentity } from 'src/auth/entities/users.entity';
import { ArticlesEntity } from 'src/auth/entities/articles.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Userentity,ArticlesEntity, AuthModule])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
