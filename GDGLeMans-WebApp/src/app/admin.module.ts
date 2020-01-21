import {NgModule} from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import {MeetupFormComponent} from './meetup-form/meetup-form.component';
import {AdministrationComponent} from './administration/administration.component';
import {MatTabsModule} from '@angular/material/tabs';
import {adminRouting} from './admin.routing';
import {CommonModule} from '@angular/common';
import {MatAutocompleteModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    AdministrationComponent,
    MeetupFormComponent
  ],
  imports: [
    adminRouting,
    MatTabsModule,
    MatChipsModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    CKEditorModule,
    MatInputModule
  ]
})
export class AdminModule { }
