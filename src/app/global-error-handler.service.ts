import { Injectable, ErrorHandler, Inject, Injector, NgZone, ɵConsole } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { OAuthService } from 'angular-oauth2-oidc';
import { NotifyManagement } from './shared/NotifyManagement';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';


@Injectable()
export class GlobalErrorHandlerService extends ErrorHandler {
  constructor(@Inject(Injector) private injector: Injector,private oauthService: OAuthService,
  @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    super();


  }
 
 

  // private get redirecToLoginHeloer(): RedirectToLogin {
  //   return this.injector.get(RedirectToLogin);
  // }

  handleError(error: any) {
      
    if (error instanceof HttpErrorResponse) {
      

      if ( error.status  == 401 ){
        this.oauthService.initImplicitFlow();
        this.storage.remove('userInfo');

      }
     if ( error.status == 403 ){
        console.log('UnAutorized');
        
        let router = this.injector.get(Router);
        router.navigate(['/UnAutorized'])
        
        // window.location.href = '/UnAutorized';
        // this.router.navigate(['UnAutorized']);
        // this.notify.showErrorMessageBox("شما دسترسی لازم جهت مشاهده این بخش را دارا نمی باشید!");
      }
     if(error.status == 500){
        console.log('500')
      
      }

      if(error.status == 504){
        console.log('504')
      }

      else
      {
      console.error("An error occurred http Type:", error);
      }
    } else {
      if((error.type)&& error.type==='token_error'){
        this.oauthService.initImplicitFlow();
        this.storage.remove('userInfo');
        console.error("Ann error occurred:", error);

      }
      console.error( error);
      console.error( error.type);
 

    }
  }





    // Need to get ToastrService from injector rather than constructor injection to avoid cyclic dependency error
    // private get toastrService(): ToastrService {
    //   return this.injector.get(ToastrService);
    // }

    // public handleError(error: any): void {
    //   this.toastrService.error(
    //     "An unexpected error has occurred.",
    //     "Error",
    //     {
    //       closeButton: true,
    //       timeOut: 5000,
    //       onActivateTick: true
    //     }
    //   );

    //   super.handleError(error);
    // }


}
