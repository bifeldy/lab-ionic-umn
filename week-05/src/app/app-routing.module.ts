import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/places',
    pathMatch: 'full'
  },
  {
    path: 'places',
    canLoad: [AuthGuard],
    loadChildren: () => import('./places/places.module').then(m => m.PlacesPageModule)
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthPageModule'
  },
  {
    path: 'bookings',
    canLoad: [AuthGuard],
    loadChildren: './bookings/bookings.module#BookingsPageModule'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
