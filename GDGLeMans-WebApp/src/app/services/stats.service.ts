import {Injectable} from '@angular/core';
import {Stats} from '../models/stats';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

/*
 * There are no CREATE, UPDATE, DELETE method in the stats API
 * The stats are computed in the dotnet API and sent to the angular front.
 * Hence why we only have a getStats method here
 */

export class StatsService {

  apiUrl = environment.apiRootUrl + 'Stats';

  constructor(private httpClient: HttpClient) {
  }

  public getStats() {
    const temp = this.httpClient.get<Stats>(this.apiUrl);
    return temp;
  }
}
