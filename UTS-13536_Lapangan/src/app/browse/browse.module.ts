import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BrowsePage } from './browse.page';

const routes: Routes = [
  {
    path: '',
    component: BrowsePage,
    children: [
      {
        path: 'venue',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./venue/venue.module').then(m => m.VenuePageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'venue'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'venue'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BrowsePage]
})
export class BrowsePageModule {}
