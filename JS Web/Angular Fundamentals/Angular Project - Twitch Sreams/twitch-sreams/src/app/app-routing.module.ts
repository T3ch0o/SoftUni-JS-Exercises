import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/browse/sidebar/sidebar.component';
import { BrowseModule } from './components/browse/browse.module';
import { ProfileModule } from './components/profile/profile.module';

import { AuthenticationGuard } from './core/guards/authentication.guard';

const routes : Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'browse',
    component: SidebarComponent,
    canActivate: [ AuthenticationGuard ],
    loadChildren: () => BrowseModule
  },
  {
    path: 'user',
    component: SidebarComponent,
    canActivate: [ AuthenticationGuard ],
    loadChildren: () => ProfileModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
