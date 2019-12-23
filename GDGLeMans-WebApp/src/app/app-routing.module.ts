import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {MeetupFormComponent} from './meetup-form/meetup-form.component';
import {MeetupsComponent} from './meetups/meetups.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {MeetupDetailsComponent} from './meetup-details/meetup-details.component';
import {StatsComponent} from './stats/stats.component';
import {AdministrationComponent} from './administration/administration.component';
import {AdministrationGuard} from './administration/administration-guard';

const appRoutes: Routes = [

  {
    path: 'meetups',
    component: MeetupsComponent,
  },
  {
    path: 'meetups/:id',
    component:  MeetupDetailsComponent,
  },
  {
    path: 'administration',
    component: AdministrationComponent,
    canActivate: [AdministrationGuard],
  },
  {
    path: 'administration/edition/:id',
    component: MeetupFormComponent,
    canActivate: [AdministrationGuard],
  },
  {
    path : 'index',
    component: StatsComponent,
  },
  {
    path : '',
    component: StatsComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( appRoutes, {enableTracing: false}), // change to true for debugging purposes
  ],
  exports: [
    RouterModule
  ],
  providers: [AdministrationGuard]
})
export class AppRoutingModule { }
