import { BookEntity } from '@app/book/entities/book.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { CommentEntity } from '@app/comment/entities/comment.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  image: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  async hasPassword() {
    this.password = await hash(this.password, 10);
  }

  @OneToMany(() => BookEntity, (book) => book.admingroup)
  books: BookEntity[];

  @ManyToMany(() => BookEntity)
  @JoinTable()
  favorites: BookEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];
}
