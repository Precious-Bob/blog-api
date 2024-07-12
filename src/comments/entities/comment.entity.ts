import { ArticlesEntity } from 'src/articles/entities/articles.entity';
import { AbstractEntity } from 'src/auth/entities/abstract-entity';
import { Userentity } from 'src/auth/entities/users.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('comments')
export class CommentEntity extends AbstractEntity {
  @Column()
  body: string;

  @OneToMany((type) => Userentity, (user) => user.comments, { eager: true })
  author: Userentity;

  @ManyToOne(
    (type)=> ArticlesEntity, (article)=> article.comments, 
  )
  article: ArticlesEntity
}
