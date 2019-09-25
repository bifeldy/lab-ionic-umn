import { Component, OnInit } from '@angular/core';
import { Ukm } from '../_service/ukm.model';
import { UkmService } from '../_service/ukm.service';
import { IonItemSliding, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private myUkm: Ukm[];

  constructor(
    private ukmService: UkmService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.myUkm = this.ukmService.getAllMyUkm();
  }

  async keluarUkm(ukm: any, slidingItem: IonItemSliding) {
    slidingItem.close();
    const alert = await this.alertController.create({
      header: `UKM ${ukm.nama}`,
      message: 'Apakah Anda Ingin Keluar?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Keluar',
          handler: () => {
            this.myUkm.splice(this.myUkm.indexOf(ukm), 1);
            this.ukmService.removeMyUkm(ukm);
          }
        }
      ]
    });
    await alert.present();
  }

}
