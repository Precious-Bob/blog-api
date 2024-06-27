import { AfterInsert, BeforeInsert, Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { Exclude, classToPlain, instanceToPlain } from 'class-transformer';
import * as argon from 'argon2';

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
  @Exclude()
  password: string;

  @BeforeInsert()
  async hashedPassword() {
    this.password = await argon.hash(this.password);
  }

  // @AfterInsert()
  // deletePass() {
  //   delete this.password;
  // }

  // toJson() {
  //   //delete this.password supposed to delete password, but the @Exclude works just fine (not working yet though)
  //   return instanceToPlain(this);
  // }
}

// I can't use the id in writing queries(findone(id) because id is in the inherited class)