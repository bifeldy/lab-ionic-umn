import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'browse',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'browse',
    canLoad: [AuthGuard],
    loadChildren: () => import('./browse/browse.module').then(m => m.BrowsePageModule)
  },
  {
    path: 'bookings',
    canLoad: [AuthGuard],
    loadChildren: () => import('./bookings/bookings.module').then(m => m.BookingsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
