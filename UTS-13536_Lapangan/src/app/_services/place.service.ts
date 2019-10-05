import { Injectable } from '@angular/core';
import { Place } from '../_models/place';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private bookings: Place[] = [];

  private places: Place[] = [
    new Place(
      1,
      'Galaxy Futsal',
      'https://kemananihh.files.wordpress.com/2015/01/353401_taraflexgalaxy.jpg',
      'Ancol, DKI Jakarta',
      'Futsal'
    ),
    new Place(
      2,
      'Cihuni Badminton Court',
      'https://serpongku.com/wp-content/uploads/2018/03/villa-melati-mas.jpg',
      'Serpong, Banten',
      'Badminton'
    ),
    new Place(
      3,
      'Ben\'s Stadium',
      'http://www.streetdirectory.co.id/stock_images/travel/show_resize_image.php?imageId=ind_13360389580293',
      'Bogor, Jawa Barat',
      'Futsal',
    ),
    new Place(
      4,
      'Candra Wijaya Intl. Badminton Center',
      'https://serpongku.com/wp-content/uploads/2018/03/chandra.jpg',
      'Serpong, Banten',
      'Badminton'
    ),
  ];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  getPlaces() { return [...this.places]; }

  getPlace(placeId: number) {
    return { ...this.places.find(p => p.id === placeId) };
  }

  getBookings() { return [...this.bookings]; }

  async addBooking(place: Place) {
    const alert = await this.alertController.create({
      header: `Booking ${place.name}`,
      message: 'Are you sure with this venue?',
      buttons: [
        {
          text: 'YES',
          handler: () => {
            this.bookings.push(
              new Place(
                this.getPlace(place.id).id,
                this.getPlace(place.id).name,
                this.getPlace(place.id).imageUrl,
                this.getPlace(place.id).city,
                this.getPlace(place.id).type
              )
            );
            this.presentToast('Your booking has been added!');
          }
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        }
      ]
    });
    await alert.present();
  }

  async removeBooking(place: Place) {
    const alert = await this.alertController.create({
      header: `Cancel Booking ${place.name}`,
      message: 'Are you sure want to cancel this venue?',
      buttons: [
        {
          text: 'YES',
          handler: () => {
            this.bookings.splice(this.bookings.indexOf(place), 1);
            this.presentToast('Your booking has been cancelled!');
          }
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        }
      ]
    });
    await alert.present();
  }

  isBooked(place: Place) {
    return this.bookings.some(booking => booking.id === place.id);
  }

  isBookingEmpty() {
    return this.bookings.length === 0 ? true : false;
  }

  async presentToast(messageText: string) {
    const toast = await this.toastController.create({
      message: messageText,
      duration: 2000
    });
    toast.present();
  }

}
