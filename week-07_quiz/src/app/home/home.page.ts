import { Component, OnInit } from '@angular/core';
import { Ukm } from '../_service/ukm.model';
import { UkmService } from '../_service/ukm.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private ukmList: Ukm[];

  constructor(
    private ukmService: UkmService,
    public alertController: AlertController,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.ukmList = this.ukmService.getAllUkm();
  }

  async gabungUkm(ukm: any) {
    const alert = await this.alertController.create({
      header: `UKM ${ukm.nama}`,
      message: 'Apakah Anda Ingin Bergabung?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Gabung',
          handler: () => {
            this.ukmService.addMyUkm(ukm.id);
          }
        }
      ]
    });
    await alert.present();
  }

}
