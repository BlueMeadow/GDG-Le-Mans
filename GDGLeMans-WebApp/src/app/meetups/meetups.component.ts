import { Component, OnInit } from '@angular/core';
import {MeetupsService} from '../services/meetups.service';
import {Meetup} from '../models/meetup';


@Component({
  selector: 'app-meetup',
  templateUrl: './meetups.component.html',
  styleUrls: ['./meetups.component.css'],
})

export class MeetupsComponent implements OnInit {

  pastMeetups: Meetup[];
  upcomingMeetups: Meetup[];


  constructor(private meetupsService: MeetupsService) {
  }

  public getMeetups() {
    this.meetupsService.getUpcomingMeetups().subscribe(m => this.upcomingMeetups = m);
    this.meetupsService.getPastMeetups().subscribe(m => {
                                                        this.pastMeetups = m;
                                                        console.warn(m);
                                                          });
  }


  ngOnInit() {
    this.getMeetups();
  }

}
