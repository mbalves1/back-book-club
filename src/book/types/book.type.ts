import { BookEntity } from '../entities/book.entity';

export type BookType = Omit<BookEntity, 'updateTimestamp'>;
