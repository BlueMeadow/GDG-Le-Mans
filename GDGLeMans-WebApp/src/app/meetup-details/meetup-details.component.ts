import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Meetup } from '../models/meetup';
import { MeetupsService } from '../services/meetups.service';

@Component({
  selector: 'app-meetup-details',
  templateUrl: './meetup-details.component.html',
  styleUrls: ['./meetup-details.component.css']
})
export class MeetupDetailsComponent implements OnInit {

  meetup: Meetup;

  constructor( private route: ActivatedRoute,
               private meetupsService: MeetupsService,
               private location: Location) { }

  async ngOnInit() {
    await this.getMeetup();
    const regex = /<oembed.+?url="https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"><\/oembed>/g;
    this.meetup.gdgMeetup.content = this.meetup.gdgMeetup.content.replace(regex, '<iframe ' +
      'height="400" width="600" ' + // Size only in pixel as of HTML5
      'style="margin:auto" ' +
      'src="https://www.youtube.com/embed/$1" ' +
      'frameborder="0" ' +
      'allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" ' +
      'allowfullscreen ></iframe>');
  }

  getMeetup() {

    return new Promise(resolve => {
      const id = +this.route.snapshot.paramMap.get('id');
      this.meetupsService.getMeetup(id).subscribe(m => {
        this.meetup = m;
        resolve();
      });
    });
  }

}
