import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {MatChipsModule} from '@angular/material/chips';


import {AppComponent} from './app.component';
import {StatsComponent} from './stats/stats.component';
import {MeetupsComponent} from './meetups/meetups.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {MeetupDetailsComponent} from './meetup-details/meetup-details.component';
import {SafePipe} from './utils/safe-pipe';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule, MatButtonModule, MatDialogModule, MatIconModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {TagDialogComponent} from './tag-dialog/tag-dialog.component';
import {AdminModule} from './admin.module';
import {AppRoutingModule} from './app-routing.module';
import {OAuthModule} from 'angular-oauth2-oidc';


@NgModule({
  declarations: [
    AppComponent,
    StatsComponent,
    MeetupsComponent,
    PageNotFoundComponent,
    MeetupDetailsComponent,
    SafePipe,
    TagDialogComponent
  ],
  imports: [
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['https://localhost:44324/api'],
        sendAccessToken: true,
      }
    }
    ),
    AppRoutingModule,
    AdminModule,
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CKEditorModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  entryComponents: [ TagDialogComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
