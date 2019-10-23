import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from 'src/app/_services/places.service';
import { NavController } from '@ionic/angular';
import { Place } from 'src/app/_services/place.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {

  private loadedPlace: Place;
  private placeSub: Subscription;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/offers');
        return;
      }
      this.placeSub = this.placesService.getPlace(paramMap.get('placeId')).subscribe(place => {
        this.loadedPlace = place;
      });
      this.form = new FormGroup({
        title: new FormControl(this.loadedPlace.title, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        description: new FormControl(this.loadedPlace.description, {
          updateOn: 'blur',
          validators: [Validators.required, Validators.maxLength(180)]
        }),
      });
    });
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

}
