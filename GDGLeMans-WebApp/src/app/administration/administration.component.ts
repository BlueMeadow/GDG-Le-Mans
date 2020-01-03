import { Component, OnInit } from '@angular/core';
import {Meetup} from '../models/meetup';
import {MeetupsService} from '../services/meetups.service';
import {Tag} from '../models/tag';
import {TagsService} from '../services/tags.service';
import {MatChipInputEvent, MatDialog} from '@angular/material';
import {TagDialogComponent} from '../tag-dialog/tag-dialog.component';
import {OAuthService} from 'angular-oauth2-oidc';


export interface DialogData {
  tag: Tag;
  edition: boolean;
}

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  pastMeetups: Meetup[];
  upcomingMeetups: Meetup[];
  tags: Tag[];

  constructor(private meetupsService: MeetupsService,
              private tagsService: TagsService,
              public dialog: MatDialog) {
    this.getMeetups();
    this.getTags();
  }

  public getMeetups() {
    this.meetupsService.getUpcomingMeetups().subscribe(m => this.upcomingMeetups = m);
    this.meetupsService.getPastMeetups().subscribe(m => this.pastMeetups = m);
  }

  public getTags() {
    this.tagsService.getTags().subscribe(t => this.tags = t);
  }

  public openDialog(index, edition) {

    let dialogRef;
    if ( edition ) {
      dialogRef = this.dialog.open(TagDialogComponent, {
        data: {tag: this.tags[index], edition}
      });
    } else {
      dialogRef = this.dialog.open(TagDialogComponent, {
        data: {tag: null, edition}
      });
    }

    dialogRef.afterClosed().subscribe(result => {
      this.getTags();
    });
  }


  ngOnInit() {

  }

  populateDatabase() {
    this.meetupsService.populateMeetups();
    window.location.reload();
  }
}
