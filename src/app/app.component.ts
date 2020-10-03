import { Router } from '@angular/router';
import { OAuthService, JwksValidationHandler, OAuthErrorEvent } from 'angular-oauth2-oidc';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit, AfterViewInit, AfterContentInit, Inject, PLATFORM_ID } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbLayoutDirection, NbLayoutDirectionService, NbThemeService } from '@nebular/theme';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
 
import * as $ from 'jquery';
import { Observable } from 'rxjs';
 

@Component({
  selector: 'ngx-app',
  template: `
 
  <router-outlet ></router-outlet>` ,
})
export class AppComponent implements OnInit  {
  username = '';

  get token() { return this.oauthService.getAccessToken(); }
  get claims() { return this.oauthService.getIdentityClaims(); }

  isAuthenticated: boolean;
  userData: any;
 
  isloadedPage=false; 
  constructor(private analytics: AnalyticsService,
    private directionService: NbLayoutDirectionService, 
    private themeService: NbThemeService,
    private oauthService: OAuthService,
    private router:Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(LOCAL_STORAGE) private localStorage:WebStorageService) {

   

    let themeName= localStorage.get('themeName');
    if(themeName!=null && themeName!=undefined)
       this.themeService.changeTheme(themeName);
    this.directionService.setDirection(NbLayoutDirection.RTL);



    // // For debugging:
    // oauthService.events.subscribe(e => e instanceof OAuthErrorEvent ? console.error(e) : console.warn(e));

    // // Load information from Auth0 (could also be configured manually)
    // oauthService.loadDiscoveryDocument()

    //   // See if the hash fragment contains tokens (when user got redirected back)
    //   .then(() => oauthService.tryLogin())

    //   // If we're still not logged in yet, try with a silent refresh:
    //   .then(() => {
    //     if (!oauthService.hasValidAccessToken()) {
    //       return oauthService.silentRefresh();
    //     }
    //   })

    //   // Get username, if possible.
    //   .then(() => {
    //     if (oauthService.getIdentityClaims()) {
    //       this.username = oauthService.getIdentityClaims()['userdisplayname'];
    //     }
    //   });

    // oauthService.setupAutomaticSilentRefresh();



    this.oauthService.redirectUri = window.location.origin + '/index.html',
    this.oauthService.clientId="IME.CustomerManagement.UI"; 
    this.oauthService.issuer="https://sso.ime.co.ir";
    this.oauthService.scope= 'openid profile email phone address users roles tenants ime.customermanagement.webapi.broker.public  ime.customermanagement.webapi.common.public ime.customermanagement.webapi.exchange.public ime.customermanagement.webapi.servicehub.public ime.customermanagement.webapi.serviceinjection.public ime.customermanagement.webapi.componentmodel.public ime.customermanagement.webapi.documents.public ime.customermanagement.webapi.reports.public'
    this.oauthService.requireHttps=true;
    this.oauthService.oidc=true;
    this.oauthService.clearHashAfterLogin=false;
    this.oauthService.dummyClientSecret="{H`Q25_${!J}.V`)y?B%(JNPB>G#4P;5Zs'-yu7,g]";
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.silentRefreshTimeout= 5000000,
     this.oauthService.timeoutFactor=1;
    let expirTime= this.oauthService.getIdTokenExpiration();
    // console.log(expirTime);
    // console.info(window.location.origin + '/silent-refresh.html');
    
    this.oauthService.silentRefreshRedirectUri= window.location.origin + '/silent-refresh.html',

 
     
    this.oauthService.loadDiscoveryDocumentAndTryLogin({
      onTokenReceived: (info) => {
        const claims = this.oauthService.getIdentityClaims();
        if (claims) {
          
          //  console.log(claims)
          this.localStorage.set('tenant',  claims['tenant'])
          this.localStorage.set('roles',  claims['role'])

          this.localStorage.set('userInfo',  claims['user_display_name']+'( '+claims['tenant_display_name']+' )')
        }
        if (info.state) this.router.navigate([info.state]);
        
        if (this.oauthService.hasValidAccessToken()) {
          // this.oauthService.setupAutomaticSilentRefresh();
          //                 //  this.oauthService.setupAutomaticSilentRefresh();
          //                 Observable.timer(1000, 30000).flatMap(() => {
          //                   console.log('Starting refresh');
          //                   return this.oauthService.silentRefresh()
          //                   .then((res) => {
          //                     console.log('success Refresh');
          //                   })
          //                   .catch((err) => {
          //                     console.error(err);
          //                   })
          //                 }).subscribe();

          this.oauthService.setupAutomaticSilentRefresh();
           } 
    
      }
    }).then( 
      info =>{
        this.router.initialNavigation()
      } 
    );
         
    //  this.oauthService.silentRefreshRedirectUri= window.location.origin + '/silent-refresh.html',

    // this.oauthService.silentRefresh()
    // .then(info => console.debug('refresh ok', info))
    // .catch(err => console.error('refresh error', err));
 
  }
  
 


  login() { this.oauthService.initImplicitFlow(); }
  logout() { this.oauthService.logOut(); }
  refresh() { this.oauthService.silentRefresh(); } 
  
      ngOnInit(): void {
        //this.analytics.trackPageViews();
      }


 
}
 
