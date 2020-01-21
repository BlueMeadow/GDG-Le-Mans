import {ModuleWithProviders} from '@angular/core';
import {AdministrationComponent} from './administration/administration.component';
import {RouterModule, Routes} from '@angular/router';
import {MeetupFormComponent} from './meetup-form/meetup-form.component';


export const routes: Routes = [
  { path: 'administration', component: AdministrationComponent }, // default route of the module
  { path: 'administration/edition/:id', component: MeetupFormComponent },
];

export const adminRouting: ModuleWithProviders = RouterModule.forChild(routes)
