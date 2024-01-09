import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { BookEntity } from '@app/book/entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, BookEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
