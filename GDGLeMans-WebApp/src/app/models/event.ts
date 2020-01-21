/* tslint:disable:variable-name */
import {Venue} from './venue';
import {Group} from './group';
import {PhotoAlbum} from "./photoAlbum";

export class Event {

status: string;
visibility: string;
maybe_rsvp_count: number;
venue: Venue;
id: string;
utc_offset: number;
duration: number;
time: number;
waitlist_count: number;
announced: number;
updated: number;
yes_rsvp_count: number;
created: number;
event_url: string;
description: string;
description_images: string[];
how_to_find_us: string;
name: string;
headcount: number;
group: Group;
photo_album: PhotoAlbum;


}
