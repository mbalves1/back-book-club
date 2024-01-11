import { BookType } from './book.type';

export interface BooksResponseInterface {
  books: BookType[];
  booksCount: number;
}
