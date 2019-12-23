import { Component } from '@angular/core';
import {AuthConfig, JwksValidationHandler, OAuthEvent, OAuthService} from 'angular-oauth2-oidc';
import {environment} from '../environments/environment';


export const authConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: environment.issuer,
  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  // The SPA's id. The SPA is registered with this id at the auth-server
  clientId: environment.clientId,
  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: environment.scope,
  clearHashAfterLogin: false,
  postLogoutRedirectUri: window.location.origin + '',
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GDG - Le Mans';

  constructor(private oauthService: OAuthService) {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    console.error(this.oauthService);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.setStorage(sessionStorage);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(r => {});
    this.oauthService.setupAutomaticSilentRefresh();

  }

  login() { this.oauthService.initImplicitFlow(); }

  public logout() {
    this.oauthService.logOut();
  }

}
