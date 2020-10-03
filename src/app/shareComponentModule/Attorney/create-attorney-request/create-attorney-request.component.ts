import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NotifyManagement } from '../../../shared/NotifyManagement';
import { SidebarService } from '../../../SlideInOutModule/sidebar.service';
import { BrokerRequestParameter } from '../../../Models/Misc/BrokerRequestParameter';
import { CustomerType } from '../../../Models/CustomersModels/Common/customerType';
import { Subscription } from 'rxjs';
import { AttorneyServiceService } from './../../../Services/attorney-service.service';
import { AttorneyRequest } from '../../../Models/Attorney/AttorneyRequest';
import { AttorneyCustomerInquiry } from './../../../Models/Attorney/attorneyCustomerInquiry';
import { OperationTypeEnum } from '../../../Models/CustomersModels/Enums/OperationTypeEnum';

@Component({
  selector: 'ngx-create-attorney-request',
  templateUrl: './create-attorney-request.component.html',
  styleUrls: ['./create-attorney-request.component.scss']
})
export class CreateAttorneyRequestComponent implements OnInit,OnDestroy {

  constructor(
    private formBuilder: FormBuilder,
    private notify: NotifyManagement,
    private attorneyService: AttorneyServiceService,
    private sidebarService: SidebarService,
  ) { }
  customerTypeDescription = "";
  requestForm: FormGroup;
  isNationalCodeIsvalid = false;
  sendDataToServer = false;
  @Input() mode: string;
  @Input() isViewMode: boolean = false;
  @Input() operationType: OperationTypeEnum;
  @Input() attorneyRequest:AttorneyRequest;
  @Output() needToUpdate=new EventEmitter<any>();
    operationTypeEnumView=OperationTypeEnum.View;
    operationTypeEnumAdd=OperationTypeEnum.Add;
    operationTypeEnumEdit=OperationTypeEnum.Edit;

  ngOnInit() {
    
    if(!this.attorneyRequest)
      this.attorneyRequest=new AttorneyRequest();
    this.setRequestForm();

    this.sendDataToServer = false;

    if (this.mode === "add")
      this.initialParameter = new BrokerRequestParameter();

    
    if(this.isViewMode || this.operationType==OperationTypeEnum.Edit || this.operationType==OperationTypeEnum.View) 
      this.pageIndex=1;
    else
      this.pageIndex=0;

      this.getheaderTitle();

  
      
  }

  updateResult(result){
    this.needToUpdate.emit(result);
  }


  isInquiryOfRequest = false;
  status = "";
  headerTitle = "";

  uniqueLabel = "---";
  customerTypeChangedValue(id) {

    // if (id == CustomerTypeEnum.individualInterior) {
    //   this.nationalCodeLength = 10;
    //   this.maskTxt = "0000000000";
    //   this.uniqueLabel = "کد ملی";
    //   this.customerType=CustomerTypeEnum.individualInterior;
    // } else if (id == CustomerTypeEnum.legalInterior) {
    //   this.nationalCodeLength = 11;
    //   this.maskTxt = "00000000000";
    //   this.uniqueLabel = "شناسه ملی";
    //   this.customerType=CustomerTypeEnum.legalInterior;

    // }
    // else if (id == CustomerTypeEnum.public) {
    //   this.nationalCodeLength = 11;
    //   this.maskTxt = "00000000000";
    //   this.uniqueLabel = "شناسه ملی";
    //   this.customerType=CustomerTypeEnum.public;

    // }
    //   else if (id == CustomerTypeEnum.individualExterior) {
    //   this.nationalCodeLength = 9;
    //   this.maskTxt = "000000000";
    //   this.uniqueLabel = "کد فیدا";
    //   this.customerType=CustomerTypeEnum.individualExterior;

    // }

    // else if (id == CustomerTypeEnum.legalExterior) {
    //   this.nationalCodeLength = 9;
    //   this.maskTxt = "000000000";
    //   this.uniqueLabel = "کد فیدا";
    //   this.customerType=CustomerTypeEnum.legalExterior;

    // }
  }

  localSubscriber: Subscription;
  ngOnDestroy(): void {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }
  }
  errorDescription: string = "";

  onNextPage() {
    this.sendDataToServer = true;
    if (this.pageIndex == 0) {
      if (
        this.initialParameter &&
        this.initialParameter.nationalCode &&
        this.initialParameter.nationalCode.trim().length < 9
      ) {
        this.notify.showErrorMessageBoxWithDuplicate(
          "شناسه وارد شده صحیح نمی باشد"
        );
        this.sendDataToServer = false;
        this.isInquiryOfRequest = false;
        return;
      }

      this.localSubscriber = this.attorneyService
      .chekIsExistClintInCustomersOfRequest(
        this.initialParameter.nationalCode
      )
      .subscribe(
        (result ) => {
          this.sendDataToServer = false;
          this.isInquiryOfRequest = false;
           

          if(!result){
            this.notify.showErrorMessageBox('جوابی درستی دریافت نشد!')
            return;
          }
          // this.allowNextPage();
          // let resultOfInquiry=(result as AttorneyCustomerInquiry);
          // this.attorneyRequest.externalId='504444444445'
          // this.attorneyRequest.name='موکل تست';
          
          if(result.exists && result.isAssigned){
            let resultOfInquiry=(result as AttorneyCustomerInquiry);
            this.attorneyRequest=new AttorneyRequest();

            this.attorneyRequest.customerExternalId=resultOfInquiry.externalId;
            this.attorneyRequest.customerName=resultOfInquiry.name;
            this.allowNextPage();
          }
          if(result.exists && !result.isAssigned){
            this.notify.showErrorMessageBox('شناسه یکتا وارد شده برای مشتری، شامل مشتریان کارگزاری شما نمی باشد، لازم است ابتدا درخواست افزودن ارسال شود')
            return;
          }

          if(!result.exists ){
            this.notify.showErrorMessageBox('شناسه یکتا وارد شده برای مشتری، در سامانه یافت نشد، لازم است ابتدا اقدام به ثبت اطلاعات مشتری در سامانه نمایید')
            return;
          }

          
          // if (!result) {
          //   this.allowNextPage();
          //   return;
          // }

        },
        (error) => {
          this.allowNextPage();

          this.sendDataToServer = false;
          this.isInquiryOfRequest = false;
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
      );
      
  }else this.allowNextPage();
}
 
  inquiryRequestInformation() {
  
    this.isInquiryOfRequest = true;
    // setTimeout(() => {
    //   this.pageIndex++;
    //   this.isInquiryOfRequest = false;
    //   console.log(this.pageIndex)
    // }, 5000);
    
  }

  allowNextPage() {
     

    this.submitted = true;

    if (this.mode == "edit") {
      this.pageIndex++;
      this.getheaderTitle();
      return;
    }

    if (this.pageIndex === 0) {
      this.pageIndex++;
      this.getheaderTitle();
    } else {
      
      this.pageIndex++;
      this.getheaderTitle();
      this.isInquiryOfRequest = false;
    }
  }

  get ctrl() {
    return this.requestForm.controls;
  }
  public pageIndex = 0;
  submitted = false;
  nationalCodeLength = 10;
  maskTxt = "000000000000";

  initialParameter: BrokerRequestParameter = new BrokerRequestParameter();

  setRequestForm() {
    this.requestForm = this.formBuilder.group({
      customerCode: ["", [Validators.required]],
    });
  }

  public onPerviousPage() {
    console.log(this.pageIndex)
    this.sendDataToServer = false;
    if (this.pageIndex == 0 || (this.pageIndex == 1 && this.operationType!==OperationTypeEnum.Add) ) {
      this.sidebarService.toggle("out");
      this.sidebarService.sendToServer(false);
      return;
    }
    this.pageIndex--;
    this.getheaderTitle();
  }

  getheaderTitle() {
 

    switch (this.pageIndex) {
      case 0:
        this.headerTitle = "";
        break;
      case 1:
        this.headerTitle = "جدول مشخصات وکیل";
        break;
      case 2:
        this.headerTitle = "اطلاعات نشانی وکیل ";
        break;
      case 3:
        this.headerTitle = "حدود اختیارات وکیل";
        break;
    }
  }

}
