import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, share, tap, switchMap } from 'rxjs/operators';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private http: HttpClient
  ) { }

  fetchBooking() {
    return this.http.get('http://mobdevumn.com/api/fti_booking_app/get_bookings.php');
  }

  deleteBooking(id: string) {
    const jsonData = {
      booking_id: id
    };
    return this.http.post('http://mobdevumn.com/api/fti_booking_app/delete_booking.php', jsonData).pipe(take(1));
  }

  insertBooking(newBooking: any) {
    console.log(newBooking);
    const jsonData = {
      booking_name: newBooking.booking_name,
      topic: newBooking.topic,
      details: newBooking.details,
      booking_date: newBooking.booking_date,
      start_hour: newBooking.start_hour,
      end_hour: newBooking.end_hour,
      creator: newBooking.creator
    };
    return this.http.post('http://mobdevumn.com/api/fti_booking_app/insert_booking.php', jsonData).pipe(take(1));
  }

}
