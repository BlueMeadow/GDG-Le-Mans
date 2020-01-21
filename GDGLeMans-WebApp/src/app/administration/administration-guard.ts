import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';
import {Injectable} from '@angular/core';

@Injectable()
export class AdministrationGuard implements CanActivate {

  constructor(private oauthService: OAuthService) {


  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    console.log("route : " + route);
    const hasIdToken = this.oauthService.hasValidIdToken();

    if(!hasIdToken) {
      this.oauthService.initLoginFlow();
    }

    const hasAccessToken = this.oauthService.hasValidAccessToken();
    return (hasIdToken && hasAccessToken);
  }
}
