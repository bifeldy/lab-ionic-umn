import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  private isLogin = true;
  private isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.isLoading = false;
  }

  onLogin() {
    this.isLoading = true;
    this.loadingCtrl.create({
      keyboardClose: true,
      message: 'Logging in...'
    })
    .then(loadingEl => {
      loadingEl.present();
      setTimeout(() => {
        this.isLoading = false;
        loadingEl.dismiss();
        this.router.navigateByUrl('/places');
      }, 1500);
    });
    this.authService.login();
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    if (this.isLogin) {} else {}
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

}
