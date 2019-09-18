import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/_services/place.model';
import { PlacesService } from 'src/app/_services/places.service';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  private loadedPlaces: Place[];

  constructor(
    private placesService: PlacesService
  ) { }

  ngOnInit() {
    this.loadedPlaces = this.placesService.getAllPlaces();
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }

}
