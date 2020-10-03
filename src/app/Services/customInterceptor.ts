import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
 /**
  *
  */
            constructor(private oauthService: OAuthService) {
                
            }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // if(this.oauthService.has)
        // console.log(this.oauthService)
        
// try {
//     if (!this.oauthService.hasValidAccessToken()) {
//         this.oauthService.initImplicitFlow( );
//         return ;
//         }
// } catch (error) {
//     try {
//         this.oauthService.initImplicitFlow( );
//     } catch (error) {
//         console.error('CustomInterceptor has error');
        
//     }
// }

        request = request.clone({
            withCredentials: true,
            setHeaders: {
                Authorization: `Bearer ${this.oauthService.getAccessToken()}`
              }
        });
     

        return next.handle(request);
    }
}


