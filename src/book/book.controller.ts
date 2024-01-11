import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { User } from '@app/user/decorators/user.decorator';
import { UserEntity } from '@app/user/entities/user.entity';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { BookResponseInterface } from './types/bookResponse.interface';
import { BooksResponseInterface } from './types/booksResponse.interface';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';
import { BookEntity } from './entities/book.entity';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @User() currentUser: UserEntity,
    @Body('books') createBookDto: CreateBookDto,
  ): Promise<BookResponseInterface> {
    const book = await this.bookService.createBook(currentUser, createBookDto);
    return await this.bookService.buildBookResponse(book);
  }

  @Get('feed')
  async findAll(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<BooksResponseInterface> {
    return await this.bookService.findAll(currentUserId, query);
  }

  @Get(':slug')
  @UseGuards(AuthGuard)
  async findBySlug(
    @Param('slug') slug: string,
  ): Promise<BookResponseInterface> {
    const book = await this.bookService.findBySlug(slug);
    return this.bookService.buildBookResponse(book);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async removeBook(
    @Param('id') id: string,
    @User() currentUser: UserEntity,
  ): Promise<any> {
    return await this.bookService.remove(+id, currentUser);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.bookService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
  //   return this.bookService.update(+id, updateBookDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.bookService.remove(+id);
  // }
}
