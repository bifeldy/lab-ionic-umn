import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private _books: Booking[] = [
    new Booking(
      '1',
      '2',
      '3',
      '4',
      5
    ),
    new Booking(
      '6',
      '7',
      '8',
      '9',
      10
    ),
    new Booking(
      '11',
      '12',
      '13',
      '14',
      15
    ),
    new Booking(
      '16',
      '17',
      '18',
      '19',
      20
    ),
  ];

  constructor() { }

  getAllBook() {
    return [...this._books];
  }

  getBook(bookId: string) {
    return {
      ...this._books.find(p => p.id === bookId)
    };
  }

  deleteBook(book: any) {
    this._books.splice(this._books.indexOf(book), 1);
  }

}
