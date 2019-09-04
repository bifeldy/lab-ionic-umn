import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/_services/place.model';
import { PlacesService } from 'src/app/_services/places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  private loadedPlaces: Place[];

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.loadedPlaces = this.placesService.getAllPlaces();
  }

}
