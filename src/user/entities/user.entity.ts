import { BookEntity } from '@app/book/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { hash } from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column({ default: '' })
  image: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => BookEntity, (book) => book.admingroup)
  groups: BookEntity[];
}
