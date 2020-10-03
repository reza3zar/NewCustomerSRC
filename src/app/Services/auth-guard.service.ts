import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private oauthService: OAuthService, private router: Router,@Inject(LOCAL_STORAGE) private storage: WebStorageService,) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
     
  
    if (this.oauthService.hasValidAccessToken()) {
      return true;
    }
    this.storage.remove('userInfo');
    // this.oauthService.state=route.routeConfig.path;
    this.oauthService.initImplicitFlow(state.url);
    
    return false;
  }
}