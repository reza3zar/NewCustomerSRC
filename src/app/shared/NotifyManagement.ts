import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Injectable } from '@angular/core';
@Injectable()
export class NotifyManagement{
      config = {
        closeButton: true,
        easing: 'ease-in',
        toastClass: 'ngx-toastr myOrginalFont',
        messageClass: 'myOrginalFont',
        iconClasses: {
          error: 'toast-error',
          info: 'toast-info',
          success: 'toast-success',
          warning: 'toast-warning',
        },
        destroyByClick: true,
        hasIcon: true,
        position: NbGlobalPhysicalPosition.TOP_LEFT,
        preventDuplicates: true,
        duration :0,
      };
constructor(private toastrService:NbToastrService) {
    
    
}

public showErrorMessageBox(   body: string) {
    this.toastrService.danger(
      body,
       '',this.config);
  }

  public showSuccessMessageBox(   body: string) {
    this.toastrService.success(
      body,
       '',this.config);
  }

  public showSuccessMessageBoxWithDuplicate(   body: string) {
    this.config.preventDuplicates=false;
    this.config.duration=5000;

    this.toastrService.success(
      body,
       '',this.config);

    this.config.preventDuplicates=true;
    this.config.duration=0;


  }

  public showErrorMessageBoxWithDuplicate(   body: string) {
    this.config.preventDuplicates=false;
    this.config.duration=5000;
    this.toastrService.danger(
      body,
       '',this.config);
    this.config.preventDuplicates=true;
    this.config.duration=0;

  }

  
}