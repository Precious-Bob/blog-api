import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { OptionalAuthGuard, jwtGuard } from 'src/auth/guards';
import { Userentity } from 'src/auth/entities/users.entity';
import { GetUser } from 'src/auth/user.decorator';
import { query } from 'express';
import { FindAllQuery, FindFeedQuery } from './entities/articles.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @UseGuards(new OptionalAuthGuard())
  async findAll(@GetUser() user: Userentity, @Query() query: FindAllQuery) {
    const articles = await this.articlesService.findAll(user, query);
    return { articles, articlesCount: articles.length };
  }

  @Get('feed')
  @UseGuards(jwtGuard)
  async findFeed(@GetUser() user: Userentity, @Query() query: FindFeedQuery) {
    const articles = await this.articlesService.findFeed(user, query);
    return { articles, articlesCount: articles.length };
  }

  @Get(':slug')
  @UseGuards(new OptionalAuthGuard())
  async findBySlug(@Param('slug') slug: string, user: Userentity) {
    const article = await this.articlesService.findBySlug(slug);
    return { article: article.toArticle(user) };
  }

  @Post()
  @UseGuards(jwtGuard)
  async createArticle(
    @GetUser() user: Userentity,
    @Body() dto: { article: CreateArticleDto },
  ) {
    const article = await this.articlesService.createArticle(user, dto.article);
    return { article };
  }

  @Patch('slug')
  @UseGuards(jwtGuard)
  async updateArticle(
    @Param('slug') slug: string,
    @GetUser() user: Userentity,
    @Body() dto: { article: UpdateArticleDto },
  ) {
    const article = await this.articlesService.updateArticle(
      slug,
      user,
      dto.article,
    );
    return { article };
  }
  @Delete(':slug')
  @UseGuards(jwtGuard)
  async deleteArticle(@Param() slug: string, @GetUser() user: Userentity) {
    const article = await this.articlesService.deleteArticle(slug, user);
    return { article };
  }
}
