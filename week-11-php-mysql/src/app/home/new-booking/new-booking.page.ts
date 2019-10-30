import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BookingService } from 'src/app/_services/booking.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.page.html',
  styleUrls: ['./new-booking.page.scss'],
})
export class NewBookingPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private bookingService: BookingService
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss(null, 'cancel');
  }

  addNewBooking(f: NgForm) {
    this.bookingService.insertBooking({
      booking_name: f.value.bookingName,
      topic: f.value.topic,
      details: f.value.details,
      booking_date: f.value.bookingDate,
      start_hour: f.value.starthour,
      end_hour: f.value.endHour,
      creator: f.value.creator
    }).subscribe(() => {
      this.bookingService.fetchBooking().subscribe(bookings => {
        console.log(bookings);
      });
      console.log('Inserted');
      this.closeModal();
    });
  }

}
