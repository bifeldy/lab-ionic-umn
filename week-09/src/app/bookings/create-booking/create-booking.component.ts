import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/_services/place.model';
import { ModalController, LoadingController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {

  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';
  startDate: string;
  endDate: string;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);
    if (this.selectedMode === 'random') {
      this.startDate = new Date(
        availableFrom.getTime() +
        Math.random() * (availableTo.getTime() - 7 * 24 * 60 * 60 * 1000 - availableFrom.getTime())
      ).toISOString();
      this.endDate = new Date(
        new Date(this.startDate).getTime() +
        Math.random() *
        (new Date(this.startDate).getTime() +
          6 * 24 * 60 * 60 * 1000 -
          new Date(this.startDate).getTime())
      ).toISOString();
    }
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'Cancel');
  }

  onBookPlace() {
    // this.isLoading = true;
    this.loadingCtrl.create({
      keyboardClose: true,
      message: 'Booking the place ...'
    })
    .then(loadingElement => {
      loadingElement.present();
      setTimeout(() => {
        loadingElement.dismiss();
        this.modalCtrl.dismiss(
          { message: 'Booked!' },
          'confirm'
        );
      }, 2000);
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Book Place',
      buttons: [
        { text: 'Book w/ Random Date' },
        { text: 'Cancel', role: 'cancel' }
      ]
    });
    await actionSheet.present();
  }

}
