import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'follows' })
export class FollowEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // pessoa que segue
  @Column()
  followerId: number;

  @Column()
  followingId: number;
}
