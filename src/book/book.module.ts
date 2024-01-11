import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { UserEntity } from '@app/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, UserEntity])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
