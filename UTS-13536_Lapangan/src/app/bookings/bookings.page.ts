import { Component, OnInit } from '@angular/core';
import { Place } from '../_models/place';
import { PlaceService } from '../_services/place.service';
import { IonItemSliding, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  constructor(
    private placeService: PlaceService
  ) { }

  ngOnInit() {
  }

  getBookings() {
    return this.placeService.getBookings();
  }

  isBookingEmpty() {
    return this.placeService.isBookingEmpty();
  }

  async removeBooking(place: Place, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.placeService.removeBooking(place);
  }

}
