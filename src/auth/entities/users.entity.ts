import {
  AfterInsert,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { Exclude, classToPlain, instanceToPlain } from 'class-transformer';
import * as argon from 'argon2';
import { ArticlesEntity } from './articles.entity';

@Entity()
export class Userentity extends AbstractEntity {
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: null, nullable: true })
  image: string | null;

  @Column()
  @Exclude() // Add { toPlainOnly: true } if  i wanna work with the password
  password: string;

  @OneToMany((type) => ArticlesEntity, (article) => article.author)
  articles: ArticlesEntity[];

  @ManyToMany((type) => ArticlesEntity, (article) => article.favouritedBy)
  @JoinColumn()
  favourites: ArticlesEntity[];

  @ManyToMany((type) => Userentity, (user) => user.followee)
  @JoinTable()
  followers: Userentity[];

  @ManyToMany(() => Userentity, (user) => user.followers)
  followee: Userentity[];

  @BeforeInsert()
  async hashedPassword() {
    this.password = await argon.hash(this.password);
  }

  // toJson() {
  //   return instanceToPlain(this);  i now use the global class serializer
  // }

  toProfile(user: Userentity) {
    const following = this.followers.includes(user);
    delete user.followers;
    return { user, following };
  }
}
