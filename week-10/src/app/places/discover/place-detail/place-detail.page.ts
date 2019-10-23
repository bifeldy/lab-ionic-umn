import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from 'src/app/_services/place.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { PlacesService } from 'src/app/_services/places.service';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {

  private loadedPlace: Place;
  private placeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      paramMap => {
        if (!paramMap.has('placeId')) {
          this.navCtrl.navigateBack(paramMap.get('placeId'));
          return;
        }
        this.placeSub = this.placesService.getPlace(paramMap.get('placeId')).subscribe(place => {
          this.loadedPlace = place;
        });
      }
    );
  }

  async onBookPlace() {
    this.actionSheetCtrl.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModal('select');
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModal('random');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    })
    .then(actionSheetEl => {
      actionSheetEl.present();
    });
  }

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);
    this.modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: {selectedPlace: this.loadedPlace, selectedMode: mode }
    })
    .then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then(resultData => {
      console.log(resultData.data, resultData.role);
      if (resultData.role === 'confirm') {
        console.log('BOOKED');
      }
    });
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

}
