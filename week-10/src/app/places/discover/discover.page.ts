import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from 'src/app/_services/place.model';
import { PlacesService } from 'src/app/_services/places.service';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {

  private loadedPlaces: Place[];
  private listedLoadedPlaces: Place[];
  private placesSub: Subscription;

  constructor(
    private placesService: PlacesService
  ) { }

  ngOnInit() {
    this.placesSub = this.placesService.getAllPlaces().subscribe(places => {
      this.loadedPlaces = places;
      this.listedLoadedPlaces = this.loadedPlaces.slice(1);
    });
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

}
