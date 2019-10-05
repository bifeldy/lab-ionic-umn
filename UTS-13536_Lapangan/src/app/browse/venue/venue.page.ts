import { Component, OnInit } from '@angular/core';
import { PlaceService } from 'src/app/_services/place.service';
import { AlertController, NavController } from '@ionic/angular';
import { Place } from 'src/app/_models/place';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.page.html',
  styleUrls: ['./venue.page.scss'],
})
export class VenuePage implements OnInit {

  constructor(
      private placeService: PlaceService,
      private navCtrl: NavController
    ) { }

  ngOnInit() {
  }

  getPlaces() {
    return this.placeService.getPlaces();
  }

  isBooked(place: Place) {
    return this.placeService.isBooked(place);
  }

  addBooking(place: Place) {
    return this.placeService.addBooking(place);
  }

  removeBooking(place: Place) {
    return this.placeService.removeBooking(place);
  }

}
