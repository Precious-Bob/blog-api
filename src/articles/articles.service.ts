import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ArticlesEntity,
  FindAllQuery,
  FindFeedQuery,
} from 'src/articles/entities/articles.entity';
import { Like, Repository } from 'typeorm';
import { Userentity } from 'src/auth/entities/users.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticlesEntity)
    private readonly articleRepo: Repository<ArticlesEntity>,
    @InjectRepository(Userentity)
    private readonly userRepo: Repository<Userentity>,
  ) {}

  async findAll(user: Userentity, query: FindAllQuery) {
    let findOptions: any = {
      where: {},
    };
    if (query.author) findOptions.where['author.username'] = query.author;
    if (query.favourited)
      findOptions.where['favouritedBy.username'] = query.favourited;
    if (query.tag) findOptions.where.taglist = Like(`%${query.tag}%`);
    if (query.offset) findOptions.offset = query.offset;
    if (query.limit) findOptions.limit = query.limit;
    return (await this.articleRepo.find(findOptions)).map((article) =>
      article.toArticle(user),
    );
  }

  async findFeed(user: Userentity, query: FindFeedQuery) {
    const { followee } = await this.userRepo.findOne({
      where: { id: user.id },
      relations: ['followee'],
    });

    const findOptions = {
      ...query,
      where: followee.length
        ? followee.map((follow) => ({ author: follow.id }))
        : {},
    };

    return this.articleRepo.find(findOptions);
  }

  findBySlug(slug: string) {
    return this.articleRepo.findOne({ where: { slug } });
  }

  private ensureOwnership(user: Userentity, article: ArticlesEntity): boolean {
    return article.author.id === user.id;
  }
  async createArticle(user: Userentity, dto: CreateArticleDto) {
    const article = this.articleRepo.create(dto);
    article.author = user;
    const { slug } = await article.save();
    return (await this.articleRepo.findOne({ where: { slug } })).toArticle(
      user,
    );
  }

  async updateArticle(slug: string, user: Userentity, dto: UpdateArticleDto) {
    const article = await this.findBySlug(slug);
    if (!this.ensureOwnership(user, article)) throw new UnauthorizedException();
    await this.articleRepo.update({ slug }, dto);
    return article.toArticle(user);
  }

  async deleteArticle(slug: string, user: Userentity) {
    const article = await this.findBySlug(slug);
    if (!this.ensureOwnership(user, article)) throw new UnauthorizedException();
    await this.articleRepo.remove(article);
  }

  async favouriteArticle(slug: string, user: Userentity) {
    const article = await this.findBySlug(slug);
    article.favouritedBy.push(user);
    await article.save();
    return article.toArticle(user);
  }

  async unfavouriteArticle(slug: string, user: Userentity) {
    const article = await this.findBySlug(slug);
    article.favouritedBy = article.favouritedBy.filter(
      (fav) => fav.id !== user.id,
    );
    await article.save();
    return (await this.findBySlug(slug)).toArticle(user)
  }
}
