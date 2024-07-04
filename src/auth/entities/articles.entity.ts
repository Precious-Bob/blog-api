import { extend } from 'slug';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  RelationCount,
} from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import * as slugify from 'slug';
import { Userentity } from './users.entity';

@Entity()
export class ArticlesEntity extends AbstractEntity {
  @Column()
  slug: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  body: string;

  @RelationCount((article: ArticlesEntity) => article.favouritedBy)
  favouritesCount: number;

  @ManyToOne((type) => Userentity, (user) => user.articles, { eager: true })
  author: Userentity;

  @ManyToMany((type) => Userentity, (user) => user.favourites, { eager: true })
  @JoinColumn()
  favouritedBy: Userentity[];

  @Column('simple-array')
  taglist: string[];

  toArticle(user: Userentity) {
    let favourited = null;
    if (user) favourited = this.favouritedBy.includes(user);
    delete this.favouritedBy;
    return { ...favourited };
  }

  @BeforeInsert()
  generateSlug() {
    this.slug =
      slugify(this.title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
  }
}
