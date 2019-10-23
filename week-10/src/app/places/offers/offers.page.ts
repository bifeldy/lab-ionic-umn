import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from 'src/app/_services/place.model';
import { PlacesService } from 'src/app/_services/places.service';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {

  private loadedPlaces: Place[];
  private placesSub: Subscription;

  constructor(
    private placesService: PlacesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.placesSub = this.placesService.getAllPlaces().subscribe(places => {
      this.loadedPlaces = places;
    });
  }

  editOffer(id: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/places/offers/edit', id]);
  }

  ngOnDestroy() {
    this.placesSub.unsubscribe();
  }

}
