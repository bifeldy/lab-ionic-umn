import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.salam();
  }

  async salam() {
    const alert = await this.alertController.create({
      header: 'Salam Kenal!',
      message: 'Btw, ini kok soalnya minta fragment profile di dalam menu Browse Venue yah, agak aneh gimana gitu ..',
      buttons: [
        {
          text: 'OK',
          handler: () => {}
        }
      ]
    });
    await alert.present();
  }

}
