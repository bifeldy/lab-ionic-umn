import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {
      title: 'Browse Venue',
      url: '/browse',
      icon: 'business'
    },
    {
      title: 'My Bookings',
      url: '/bookings',
      icon: 'checkbox-outline'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Query for the toggle that is used to change between themes
      const toggle = document.querySelector('#themeToggle');

      // Listen for the toggle check/uncheck to toggle the dark class on the <body>
      toggle.addEventListener('ionChange', (ev) => {
        document.body.classList.toggle('dark', (ev as any).detail.checked);
      });

      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

      // Listen for changes to the prefers-color-scheme media query
      // tslint:disable-next-line: deprecation
      prefersDark.addListener((e) => checkToggle(e.matches));

      // Called when the app loads
      function loadApp() {
        checkToggle(prefersDark.matches);
      }

      // Called by the media query to check/uncheck the toggle
      function checkToggle(shouldCheck) {
        (toggle as any).checked = shouldCheck;
      }

    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
