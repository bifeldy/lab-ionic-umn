import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/_services/place.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { PlacesService } from 'src/app/_services/places.service';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  private loadedPlace: Place;

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
        this.loadedPlace = this.placesService.getPlace(paramMap.get('placeId'));
      }
    );
  }

  async onBookPlace() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Book Place',
      buttons: [{
        text: 'Book w/ Random Date',
        handler: () => {
          this.modalCtrl.create({
            component: CreateBookingComponent,
            componentProps: {
              selectedPlace: this.loadedPlace
            }
          })
          .then(modalElement => {
            modalElement.present();
            return modalElement.onDidDismiss();
          })
          .then(resultData => {
            console.log(resultData, resultData.role);
            if(resultData.role === 'confirm') {
              console.log('BOOKED');
            }
          });
        }
      }]
    });
    await actionSheet.present();
  }

}
