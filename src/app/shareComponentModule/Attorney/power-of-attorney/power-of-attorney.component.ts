import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AttorneyRequest } from '../../../Models/Attorney/AttorneyRequest';
import { AttorneyServiceService } from './../../../Services/attorney-service.service';
import { Subscription } from 'rxjs';
import { NotifyManagement } from '../../../shared/NotifyManagement';
import { SidebarService } from '../../../SlideInOutModule/sidebar.service';
import { OperationTypeEnum } from '../../../Models/CustomersModels/Enums/OperationTypeEnum';

@Component({
  selector: 'ngx-power-of-attorney',
  templateUrl: './power-of-attorney.component.html',
  styleUrls: ['./power-of-attorney.component.scss']
})
export class PowerOfAttorneyComponent implements OnInit,OnDestroy {
  @Input() attorneyRequest:AttorneyRequest=new AttorneyRequest();
  @Input() isViewMode: boolean = false;
  @Input() operationType: OperationTypeEnum = OperationTypeEnum.None;
  @Output() needToUpdate=  new EventEmitter<any>();  

  constructor(private formBuilder: FormBuilder,private attorneyService:AttorneyServiceService,private notify: NotifyManagement,private serviceServer: SidebarService) { }
  localSubscriber: Subscription;
  saverquestSubscriber: Subscription;
  ngOnDestroy(): void {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }

    if (this.saverquestSubscriber !== undefined) {
      this.saverquestSubscriber.unsubscribe();
    }

    if (this.updaterquestSubscriber !== undefined) {
      this.updaterquestSubscriber.unsubscribe();
    }
    

  }

  ngOnInit() {

    console.log(this.attorneyRequest.attorneyContractStatus)

    this.requestForm = this.formBuilder.group({
      documentId: ["", Validators.required],
      consentCode: ["", Validators.required],
      assignmentDate: ["", Validators.required],
      attorneyContractStatus: [""],
      assignmentExpirationDate: [""],
    });


    this.localSubscriber =this.attorneyService.getAllAttorneyTypes().subscribe(
      (result ) => {
        if(!result){
          this.notify.showErrorMessageBox('جوابی درستی دریافت نشد!')
          return;
        }

        this.listItems=result;
        if(this.listItems && this.attorneyRequest.attorneyContractStatus){
          this.listItems.forEach(param => {
              // if(this.attorneyRequest.attorneyContractStatuses && this.attorneyRequest.attorneyContractStatuses.)
            
            let findItem=  this.attorneyRequest.attorneyContractStatus.find(x=>x.value==param.id);
            if(findItem){
              findItem.name=param.name;
              findItem.id=param.id;
            }
          });
        }
      },
      (error) => {
        this.showErrorMessages(error);
      }
    );
  }

  showErrorMessages(error){
    if (error && error.status == 401) {
      this.notify.showErrorMessageBox(
        "اعتبار دسترسی شما به سامانه پاین یافته و نیاز به ورود مجدد می باشید"
      );
      return;
    }

    if (error && error.status == 500) {
      this.notify.showErrorMessageBox("خطای سروری 500");
      return;
    }

    if (
      error == undefined ||
      error.error == undefined ||
      error.error.errors == undefined
    ) {
      return;
    }

    if (error && error.status == 401) {
      this.notify.showErrorMessageBox(
        "اعتبار دسترسی شما به سامانه پاین یافته و نیاز به ورود مجدد می باشید"
      );
      return;
    }

    if (error && error.status == 400) {
      this.notify.showErrorMessageBox(error.message);
      return;
    }

    if (error && error.status == 500) {
      this.notify.showErrorMessageBox(
        "بروز خطا سروری، لطفا با واحد پشتیبانی تماس حاصل فرمایید"
      );
      return;
    }
    for (let errItemValue of Object.entries(error.error.errors)) {
      let val = errItemValue[1];
      if (errItemValue[1] != undefined && errItemValue[1] != null) {
        for (let errorMessageItem of Object.entries(val)) {
          this.notify.showErrorMessageBoxWithDuplicate( errorMessageItem[1]);
        }
      }
    }
  }

  get ctrl() {
    return this.requestForm.controls;
  }

    //   public listItems: Array<{ text: string, value: number }> = [
    //     { text: "معرفی یا تغییر حساب بانکی", value: 1 },
    //     { text: "ارایه فرم سفارش خرید یا فروش ", value: 2 },        
    //     { text: "انجام مکاتبات عادی", value: 3 },
    //     { text: "انجام کلیه امور تسویه ", value: 4 },
    //     { text: "انجام امور مربوط به تودیع تضامین ", value: 5 }
    // ];        
  
    public listItems: any;

    public isItemSelected(itemText: string): boolean {
          if(this.attorneyRequest.attorneyContractStatus)
        return this.attorneyRequest.attorneyContractStatus.some(item => item.name === itemText);
    }


  requestForm: FormGroup;
  @Output() clickedNext = new EventEmitter<void>();
  @Output() clickedPrevious = new EventEmitter<void>();
  submitted = false;

  onSubmit() {
    this.submitted = true;
    // ||  !(this.personalDetailsInformation.birthDate)||
    //     this.personalDetailsInformation.birthDate.trim()===''
    if (this.requestForm.invalid ) {
      return;
    }

    console.log(this.attorneyRequest)
    this.saveAttorneyRequest();
    // this.clickedNext.emit();
 
  }

  onPrevious() {
    this.clickedPrevious.emit();
  }
  sendDataToServer=false;

  fillAttorneyInfo(){
    if(this.attorneyRequest.personalDetails && this.attorneyRequest.personalDetails.nationalCode){
      this.attorneyRequest.externalId= this.attorneyRequest.personalDetails.nationalCode;
      this.attorneyRequest.name= this.attorneyRequest.personalDetails.firstName   + ' '+this.attorneyRequest.personalDetails.lastName  ;
    }

   else if(this.attorneyRequest.firmDetails && this.attorneyRequest.firmDetails.nationalCode)
       this.attorneyRequest.name= this.attorneyRequest.firmDetails.nationalCode;
  }

  //TODO: we should transfer this method outside of SharecomponentModule
  saveAttorneyRequest(){
    this.sendDataToServer=true;
    this.fillAttorneyInfo();
    if(this.operationType==OperationTypeEnum.Add)
        this.saveNewRequest();

    if(this.operationType==OperationTypeEnum.Edit)
        this.updateNewRequest();

  }

  updaterquestSubscriber:Subscription;
  updateNewRequest(){
    this.fillAttorneyInfo();

    this.saverquestSubscriber=this.attorneyService.updateAttorneyRequest(this.attorneyRequest.id,this.attorneyRequest).subscribe(result => {
      this.needToUpdate.emit(result);
      this.serviceServer.toggle("out");
      this.notify.showSuccessMessageBox("درخواست پیش نویس با موفقیت انجام شد")
      this.sendDataToServer=false;
    },error=>{


  

      this.sendDataToServer=false;
      if (error && error.status == 401) {
        this.notify.showErrorMessageBox(
          "اعتبار دسترسی شما به سامانه پاین یافته و نیاز به ورود مجدد می باشید"
        );
        return;
      }
  
      if (error && error.status == 500) {
        this.notify.showErrorMessageBox("خطای سروری 500");
        return;
      }
  
      if (
        error == undefined ||
        error.error == undefined ||
        error.error.errors == undefined
      ) {
        return;
      }
  
      if (error && error.status == 401) {
        this.notify.showErrorMessageBox(
          "اعتبار دسترسی شما به سامانه پاین یافته و نیاز به ورود مجدد می باشید"
        );
        return;
      }
  
      // if (error && error.status == 400) {
      //   this.notify.showErrorMessageBox(error.message);
      //   return;
      // }
  
      if (error && error.status == 500) {
        this.notify.showErrorMessageBox(
          "بروز خطا سروری، لطفا با واحد پشتیبانی تماس حاصل فرمایید"
        );
        return;
      }

      for (let errItemValue of Object.entries(error.error.errors)) {
        let val = errItemValue[1];
          for (let errorMessageItem of Object.entries(val)) {
            this.notify.showErrorMessageBoxWithDuplicate( errorMessageItem[1]);
          }
       
      }

    }
    );
  }

  saveNewRequest(){
    this.saverquestSubscriber=this.attorneyService.addAttorneyRequest(this.attorneyRequest).subscribe(result => {
      this.serviceServer.toggle("out");
      this.notify.showSuccessMessageBox("درخواست پیش نویس با موفقیت انجام شد")
      this.sendDataToServer=false;
      this.needToUpdate.emit(result);
    },error=>{
      this.sendDataToServer=false;
      if (error && error.status == 401) {
        this.notify.showErrorMessageBox(
          "اعتبار دسترسی شما به سامانه پاین یافته و نیاز به ورود مجدد می باشید"
        );
        return;
      }
  
      if (error && error.status == 500) {
        this.notify.showErrorMessageBox("خطای سروری 500");
        return;
      }
  
      if (
        error == undefined ||
        error.error == undefined ||
        error.error.errors == undefined
      ) {
        return;
      }
  
      if (error && error.status == 401) {
        this.notify.showErrorMessageBox(
          "اعتبار دسترسی شما به سامانه پاین یافته و نیاز به ورود مجدد می باشید"
        );
        return;
      }
  
      // if (error && error.status == 400) {
      //   this.notify.showErrorMessageBox(error.message);
      //   return;
      // }
  
      if (error && error.status == 500) {
        this.notify.showErrorMessageBox(
          "بروز خطا سروری، لطفا با واحد پشتیبانی تماس حاصل فرمایید"
        );
        return;
      }
      for (let errItemValue of Object.entries(error.error.errors)) {
        let val = errItemValue[1];
        if (errItemValue[1] != undefined && errItemValue[1] != null) {
          for (let errorMessageItem of Object.entries(val)) {
            this.notify.showErrorMessageBoxWithDuplicate( errorMessageItem[1]);
          }
        }
      }
    }
    );
  }

}
