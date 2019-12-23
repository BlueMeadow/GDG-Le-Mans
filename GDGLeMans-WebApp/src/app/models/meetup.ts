import {Event} from './event';
import {GDGMeetup} from './gdg-meetup';
import {Tag} from './tag';


// The GDGMeetup object contains the additional informations stored in the database :
// Name of the speaker, Longer description of the event

// The event is fetched from the MeetupAPI and contains all informations from here
// https://www.meetup.com/fr-FR/meetup_api/docs/:urlname/events/?uri=%2Fmeetup_api%2Fdocs%2F%3Aurlname%2Fevents%2F#list
export class Meetup {

  constructor(public gdgMeetup: GDGMeetup,
              public event: Event,
              public tags: Tag[]) {
  }

}
