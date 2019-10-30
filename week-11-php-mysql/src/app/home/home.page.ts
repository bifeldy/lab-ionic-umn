import { Component, OnInit } from '@angular/core';
import { Booking } from '../_services/booking.model';
import { BookingService } from '../_services/booking.service';
import { AlertController, ModalController } from '@ionic/angular';
import { NewBookingPage } from './new-booking/new-booking.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private bookings: Booking[] = [];

  constructor(
    private bookingService: BookingService,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  getBookings() {
    this.bookingService.fetchBooking().subscribe(bookings => {
      console.log(bookings);
    });
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Delete A Booking',
      inputs: [
        {
          name: 'bookingId',
          type: 'text',
          placeholder: 'Enter Your Booking ID'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'OK',
          handler: data => {
            this.bookingService.deleteBooking(data.bookingId).subscribe(() => {
              this.bookingService.fetchBooking().subscribe(bookings => {
                console.log(bookings);
              });
              console.log('Deleted');
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NewBookingPage
    });
    return await modal.present();
  }

  newBookings() {
    this.presentModal();
  }

  deleteBookings() {
    this.presentAlertPrompt();
  }

}
