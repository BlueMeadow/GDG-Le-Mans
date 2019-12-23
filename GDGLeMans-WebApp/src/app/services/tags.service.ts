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

export class TagsService {

  apiUrl = environment.apiRootUrl + 'Tags';

  constructor(private httpClient: HttpClient,
              private oauthService: OAuthService) {
  }


  /*
   * GET
   * Fetches all the tags in the database (by alphabetical order)
   */
  public getTags() {
    return this.httpClient.get<Tag[]>(`${this.apiUrl}`);
  }


  /*
   * POST
   * Creates a tag
   */
  public createTag(tag: Tag) {
    return this.httpClient.post(`${this.apiUrl}`, tag, { headers: new HttpHeaders({
        Authorization: "Bearer " + this.oauthService.getAccessToken()
      })});
  }

  /*
   * PUT
   * Update the tag string so every meetup containing this tag is changed
   */
  public updateTag(tag: Tag) {
    console.log("TagsService.updateTag");
    return this.httpClient.put(`${this.apiUrl}/${tag.id}`, tag, { headers: new HttpHeaders({
        Authorization: "Bearer " + this.oauthService.getAccessToken()
      })});
  }

  /*
   * DELETE
   * Deletes the tag from the database, every meetup containing his tag is changed
   */
  public deleteTag(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`,{ headers: new HttpHeaders({
        Authorization: "Bearer " + this.oauthService.getAccessToken()
      })});
  }
}
