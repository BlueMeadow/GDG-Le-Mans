import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Stats} from '../models/stats';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Meetup} from '../models/meetup';
import {Tag} from '../models/tag';
import {OAuthService} from 'angular-oauth2-oidc';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

/*
 * There are no CREATE, UPDATE, DELETE method in the stats API
 * The stats are computed in the dotnet API and sent to the angular front.
 * Hence why we only have a getStats method here
 */

export class MeetupsService {

  apiUrl = environment.apiRootUrl + 'Meetups';

  constructor(private httpClient: HttpClient,
              private oauthService: OAuthService) {

    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.oauthService.getAccessToken()
    });
  }

  /*
   * GET
   * Fetches all the meetups in the db
   */
  public getMeetups() {
    return this.httpClient.get<Meetup[]>(this.apiUrl);
  }

  /*
   * GET
   * Fetches all the upcoming meetups in the db
   */
  public getUpcomingMeetups() {
    return this.httpClient.get<Meetup[]>(this.apiUrl + '/status/upcoming', { headers: new HttpHeaders({
        Authorization: "Bearer " + this.oauthService.getAccessToken()
      })});
  }

  /*
   * GET
   * Fetches all the past meetups in the db
   */
  public getPastMeetups() {
    return this.httpClient.get<Meetup[]>(this.apiUrl + '/status/past', { headers: new HttpHeaders({
        Authorization: "Bearer " + this.oauthService.getAccessToken()
      })});
  }

  /*
   * GET
   * Fetches a single meetup in the db from its id
   */
  public getMeetup(id: number) {
    return this.httpClient.get<Meetup>(`${this.apiUrl}/${id}`, { headers: new HttpHeaders({
        Authorization: "Bearer " + this.oauthService.getAccessToken()
      })});
  }

  /*
   * PUT
   * Update the addtionnal content of the meetup
   */
  public updateMeetup(meetup: Meetup) {


    console.warn(this.oauthService.getAccessToken());
    return this.httpClient.put(`${this.apiUrl}/${meetup.gdgMeetup.id}`, meetup, { headers: new HttpHeaders({
        Authorization: "Bearer " + this.oauthService.getAccessToken()
      })});
  }

  /*
   * DELETE
   * Deletes the additional infos for a meetup
   * /!\ Does not delete the meetup
   */
  public deleteMeetup(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`, { headers: new HttpHeaders({
        Authorization: "Bearer " + this.oauthService.getAccessToken()
      })});
  }
}
