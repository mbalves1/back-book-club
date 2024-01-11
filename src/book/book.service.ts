import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';
import { BookResponseInterface } from './types/bookResponse.interface';
import { BooksResponseInterface } from './types/booksResponse.interface';
import { UserEntity } from '@app/user/entities/user.entity';
import slugify from 'slugify';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private getSlug(title: string): string {
    return (
      slugify(title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }

  buildBookResponse(book: BookEntity): BookResponseInterface {
    return { book };
  }

  async findBySlug(slug: string): Promise<BookEntity> {
    return await this.bookRepository.findOne({
      where: { slug },
    });
  }

  async createBook(
    currentUser: UserEntity,
    createBookDto: CreateBookDto,
  ): Promise<BookEntity> {
    const book = new BookEntity();
    Object.assign(book, createBookDto);

    book.slug = await this.getSlug(createBookDto.title);
    book.admingroup = currentUser;

    return await this.bookRepository.save(book);
  }

  async findAll(
    currentUserId: number,
    query: any,
  ): Promise<BooksResponseInterface> {
    const queryBuilder = this.bookRepository
      .createQueryBuilder('books')
      .leftJoinAndSelect('books.admingroup', 'admingroups');

    if (query.size) {
      queryBuilder.limit(query.size);
    }

    const offset = (query.page - 1) * query.size;
    if (query.page) {
      queryBuilder.offset(offset);
    }

    if (query.title) {
      console.log('title', query.title);
      const titleBook = await this.bookRepository.findOne({
        where: {
          title: query.title,
        },
      });
      queryBuilder.andWhere('books.title = :title', {
        title: titleBook.title,
      });
      console.log('tit>>>le', titleBook.title);
    }

    const books = await queryBuilder.getMany();

    const count = await this.bookRepository.count();
    return {
      books,
      booksCount: count,
    };
  }

  async remove(id: number, currentUser: UserEntity): Promise<any> {
    const user = currentUser;
    console.log(user);

    const findBook = await this.bookRepository.findOne({
      where: {
        id,
      },
    });

    if (!findBook) {
      throw new HttpException(
        'Cannot find this group',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const adminId = findBook.admingroup.id;

    if (user.id !== adminId) {
      throw new HttpException(
        'Cannot delete this group',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.bookRepository.delete(id);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} book`;
  // }

  // update(id: number, updateBookDto: UpdateBookDto) {
  //   return `This action updates a #${id} book`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} book`;
  // }
}
