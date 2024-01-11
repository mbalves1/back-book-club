import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { CommentResponseInterface } from './types/commentResponse.interface';
import { CommentsResponseInterface } from './types/commentsResponse.interface';
import { UserEntity } from '@app/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from '@app/book/entities/book.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,

    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  buildCommentResponse(comment: CommentEntity): CommentResponseInterface {
    return { comment };
  }

  async findBySlug(slug: string): Promise<BookEntity> {
    return await this.bookRepository.findOne({
      where: { slug },
    });
  }

  async createComment(
    slug: string,
    currentUser: UserEntity,
    createCommentDto: CreateCommentDto,
  ): Promise<CommentEntity> {
    const newComment = new CommentEntity();
    const book = await this.findBySlug(slug);
    Object.assign(newComment, createCommentDto);

    newComment.user = currentUser;
    newComment.book = book;

    return await this.commentRepository.save(newComment);
  }

  async findAll(): Promise<CommentsResponseInterface> {
    const comment = await this.commentRepository.find({
      relations: ['user', 'book'],
    });
    console.log('comment', comment);
    return { comment };
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
