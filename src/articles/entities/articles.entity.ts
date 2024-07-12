import { extend } from 'slug';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  RelationCount,
} from 'typeorm';
import { AbstractEntity } from 'src/auth/entities/abstract-entity';
import * as slugify from 'slug';
import { Userentity } from 'src/auth/entities/users.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';

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
  @JoinTable()
  favouritedBy: Userentity[];

  @Column('simple-array')
  taglist: string[];

  @OneToMany((type) => CommentEntity, (comment) => comment.article)
  comments: CommentEntity[];

  toArticle(user: Userentity) {
    let favourited = null;
    if (user && this.favouritedBy)
      favourited = this.favouritedBy.map((user) => user.id).includes(user.id);
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
export interface FindFeedQuery {
  limit?: number;
  offset?: number;
}

export interface FindAllQuery extends FindFeedQuery {
  tag?: string;
  author?: string;
  favourited?: string;
}
