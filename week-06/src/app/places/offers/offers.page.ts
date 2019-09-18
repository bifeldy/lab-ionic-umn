import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/_services/place.model';
import { PlacesService } from 'src/app/_services/places.service';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  private loadedPlaces: Place[];

  constructor(
    private placesService: PlacesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadedPlaces = this.placesService.getAllPlaces();
  }

  editOffer(id: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/places/offers/edit', id]);
  }

}
