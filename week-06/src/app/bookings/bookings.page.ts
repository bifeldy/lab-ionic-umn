import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../_services/booking.service';
import { IonItemSliding } from '@ionic/angular';
import { Booking } from '../_services/booking.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  private loadedBook: Booking[];

  constructor(
    private bookService: BookingService,
    private router: Router) { }

  ngOnInit() {
    this.loadedBook = this.bookService.getAllBook();
  }

  deleteBook(book: any, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.loadedBook.splice(this.loadedBook.indexOf(book), 1);
    this.bookService.deleteBook(book);
  }

}
