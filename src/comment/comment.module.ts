import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { BookEntity } from '@app/book/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, BookEntity])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
