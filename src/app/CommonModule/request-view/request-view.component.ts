import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrokerRequestParameter } from '../../Models/Misc/BrokerRequestParameter';
import { NotifyManagement } from '../../shared/NotifyManagement';
import { BrokerRequestsService } from '../../services/broker-requests.service';
import { SidebarService } from '../../SlideInOutModule/sidebar.service';
import { InteriorLegalBrokerRequest } from '../../Models/CustomersModels/Common/interiorLegalBrokerRequest';
import { InteriorIndividualBrokerRequest } from '../../Models/CustomersModels/Common/interiorIndividualBrokerRequest';
import { CustomerType } from '../../Models/CustomersModels/Common/customerType';
import { assignRequestResult } from '../../Models/Misc/assignRequestResult';
import { PersonalDetails } from '../../Models/CustomersModels/Individual/personalDetails';
import { AddressDetails } from '../../Models/CustomersModels/Individual/addressDetails';
import { workingDetails } from '../../Models/CustomersModels/Individual/workingDetails';
import { IdentityDetails } from '../../Models/CustomersModels/Individual/identityDetails';
import { FinancialDetails } from '../../Models/CustomersModels/Individual/financialDetails';
import { BankDetails } from '../../Models/CustomersModels/Individual/bankeDetails';
import { CommitmentDetailsComponent } from '../../shareComponentModule/commitment-details/commitment-details.component';
import { LegalBasicInformation } from '../../Models/CustomersModels/Legal/legalBasicInformation';
import { LegalPeopleWithVotingRight } from '../../Models/CustomersModels/Common/legalPeopleWithVoting';
import { BankAccountDelegate } from '../../Models/CustomersModels/Common/bankAccountDelegate';
import { ProductionInformation } from '../../Models/CustomersModels/Common/productionInformation';
import { LegalFinancialDetail } from '../../Models/CustomersModels/Common/legalFinancialDetail';
import { StackeholdersInformation } from '../../Models/CustomersModels/Common/stackHoldersInformation';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-request-view',
  templateUrl: './request-view.component.html',
  styleUrls: ['./request-view.component.scss']
})
export class RequestViewComponent implements OnInit, OnDestroy {
  errorDescription:string='';
  // request: brokerRequest = new brokerRequest();
  // requestInteriorIndividual: InteriorIndividualBrokerRequest = new InteriorIndividualBrokerRequest();
  requestInteriorLegal: InteriorLegalBrokerRequest = new InteriorLegalBrokerRequest();
  requestInteriorIndividual: InteriorIndividualBrokerRequest = new InteriorIndividualBrokerRequest();

  isInquiryOfRequest=false;
  status='';
  @Input() requestObject:any;
  @Input() mode:string;

  @Input() customerType:CustomerTypeEnum;

  @Output() clickedSaveRequest = new EventEmitter<any>();
  @Output() clickedCustomerType = new EventEmitter<any>();

  customerTypeDescription = "";
  requestForm: FormGroup;
  isNationalCodeIsvalid=false;
  sendDataToServer=false;
  initialParameter: BrokerRequestParameter = new BrokerRequestParameter();
  @ViewChild('myModal', { static: false }) myModal;
  @Output() saveRequestOccurred: EventEmitter<any> = new EventEmitter();
  @Output() requestStatusChanged: EventEmitter<any> = new EventEmitter();


  constructor(
    private formBuilder: FormBuilder,
    private notify: NotifyManagement,
    private service: BrokerRequestsService,
    private sidebarService: SidebarService,
    private serviceServer:SidebarService
  ) {}
  submitted = false;
  nationalCodeLength=10;
  maskTxt='0000000000';


  ngOnInit() {
    
   

    this.sendDataToServer=false;
    var individualInterior= new CustomerType();

    // this.requestInteriorIndividual = new InteriorIndividualBrokerRequest();
    if(this.customerType==CustomerTypeEnum.individualInterior){
      this.requestInteriorIndividual=this.requestObject ;
      this.initialParameter.nationalCode=this.requestInteriorIndividual.externalId;
      this.customerTypeDescription='InteriorIndividual'
      this.customerTypeChangedValue(CustomerTypeEnum.individualInterior)
    }
    
    if(this.customerType==CustomerTypeEnum.legalInterior)
      {
        this.requestInteriorLegal=this.requestObject ;
        this.initialParameter.nationalCode=this.requestInteriorLegal.externalId;
        this.customerTypeDescription='InteriorLegal';

        this.customerTypeChangedValue(CustomerTypeEnum.legalInterior)
      }

   individualInterior.id=this.customerType.valueOf();
    this.initialParameter.customerType=individualInterior;
    this.setRequestForm();

    if(this.mode==='add')
      this.initialParameter=new BrokerRequestParameter();
      
  }

    setRequestForm(){
      this.requestForm = this.formBuilder.group({
        customerType: ["", Validators.required],
        customerCode: ["", [Validators.required]]
      });
    }
  
  get ctrl() {
    return this.requestForm.controls;
  }
  public pageIndex = 0;

customerTypeChangedValue(id){

if(id==1){
  this.nationalCodeLength=10;
  this.maskTxt='0000000000';

}
else if(id==3)
{
  this.nationalCodeLength=11;
  this.maskTxt='00000000000';
  }
}

public fillAssignObject(result):assignRequestResult{
  let assignItem: assignRequestResult=new assignRequestResult();
  assignItem.status=this.status;
  if(result.name)
    assignItem.name=result.name;
  if(result.externalId)
    assignItem.externalId=result.externalId;
  if(result.derivativesMarket)
   assignItem.derivativesMarket=result.derivativesMarket;
  if(result.spotMarket)
    assignItem.spotMarket=result.spotMarket;

  return assignItem;
}

  onNextPage() {
    this.errorDescription='';

    this.sendDataToServer=true;
    if (this.pageIndex == 0) {

      if((this.initialParameter) && (this.initialParameter.nationalCode) && this.initialParameter.nationalCode.trim().length<10){
        this.sendDataToServer=false;
        this.notify.showErrorMessageBoxWithDuplicate('شناسه وارد شده صحیح نمی باشد');
        return;

      }

      this.localSubscriber = this.service
        .chekIsExistExternalIdWithBriefInformation(this.initialParameter.nationalCode)
        .subscribe(result => {
          
          this.sendDataToServer=false;
          this.isInquiryOfRequest=false;

          if(!result){

            // this.status='assignMode' ; 
            // let assignItem: assignRequestResult=new assignRequestResult();
            // result=new assignRequestResult();
            // result.externalId=10100381585;
            // result.name='پتروشیمی خلیج فارس';

            // this.sidebarService.toggle('out');
            // assignItem=this.fillAssignObject(result);
            // this.requestStatusChanged.emit(assignItem);
            // return;
        
            
            this.allowNextPage();
            return;
          }

         
          

          if(result.isBroker==undefined ||result.isBroker==null){
            this.notify.showErrorMessageBox("در زمان استعلام شناسه خطای سمت سرور با شناسه کارگزار رخ داده است");
            return;
          }

          if(result.isBorker){
            this.status='deleteMode' ; 
            let assignItem: assignRequestResult=new assignRequestResult();
            assignItem=this.fillAssignObject(result);

            this.sidebarService.toggle('out');
            this.requestStatusChanged.emit(assignItem);
            return;
          }

          if(!result.isBorker){
            this.status='assignMode' ; 
            let assignItem: assignRequestResult=new assignRequestResult();
            assignItem=this.fillAssignObject(result);

            this.sidebarService.toggle('out');
            this.requestStatusChanged.emit(assignItem);
            return;
          }

 
      
        },error=>{
             
          this.sendDataToServer=false;
          this.isInquiryOfRequest=false;

          if(error && error.status==401){
            this.notify.showErrorMessageBox('اعتبار دسترسی شما به سامانه پاین یافته و نیاز به ورود مجدد می باشید');
            return;
          }

          if(error && error.status==500){
            this.notify.showErrorMessageBox('خطای سروری 500');
            return;
          }

          if(error==undefined ||error.error==undefined || error.error.errors==undefined ){
            return;
          }

          if(error && error.status==401){
            this.notify.showErrorMessageBox('اعتبار دسترسی شما به سامانه پاین یافته و نیاز به ورود مجدد می باشید');
            return;
          }
          
          if(error || error.status==400){
            this.notify.showErrorMessageBox(error.message);
            return;
          }
          
          if(error || error.status==500){
            this.notify.showErrorMessageBox("بروز خطا سروری، لطفا با واحد پشتیبانی تماس حاصل فرمایید");
            return;
          }
          for (let errItemValue of Object.entries(error.error.errors)) {
            let val=errItemValue[1];
            if(errItemValue[1]!=undefined && errItemValue[1]!=null)
            {
              for (let errorMessageItem of Object.entries(val)){
                this.errorDescription=errorMessageItem[1];
              }
            }
        }
        });
    }
    else


    

    this.allowNextPage();

  }

  errorNotify(error){
    if(error.status==0){
      this.notify.showErrorMessageBoxWithDuplicate("خطای سرور: سرویس از دسترس خارج می باشد!");
      return;
    }

    for (let errItemValue of Object.entries(error.error.errors)) {
      let val=errItemValue[1];
      if(errItemValue[1]!=undefined && errItemValue[1]!=null)
      {
        for (let errorMessageItem of Object.entries(val)){
          this.notify.showErrorMessageBox(errorMessageItem[1])
        }
      }
  }
  }

  inquiryRequestInformation(){
 
      this.isInquiryOfRequest=true;
    switch (this.initialParameter.customerType.id) {
      case CustomerTypeEnum.individualInterior:

        this.individualInquiry=  this.service.getInquiryOfRequest(CustomerTypeEnum.individualInterior,this.initialParameter.nationalCode).subscribe(reult=>{
           
            this.setInformationToRequest(reult);
            this.pageIndex++;

        },error=>{

          this.sendDataToServer=false;
          this.isInquiryOfRequest=false;
          this.showerrorHandler(error);
          this.errorNotify(error)
        });
        break;
      case CustomerTypeEnum.legalInterior:
        this.legalInquiry=  this.service.getInquiryOfRequest(CustomerTypeEnum.legalInterior,this.initialParameter.nationalCode).subscribe(reult=>{
          this.setInformationToRequest(reult);
          this.pageIndex++;
        },error=>{
          this.isInquiryOfRequest=false;
          this.showerrorHandler(error);
          this.errorNotify(error)

        });
        break;
      default:
        this.setInformationToRequest();
        break;
    }
  }

allowNextPage(){

  this.submitted = true;
  if (this.requestForm.invalid) {
    return;
  }

  if(this.mode=='edit'){
    this.pageIndex++;
    return;
  }

 
  

   if(this.pageIndex==0)
      {
        this.inquiryRequestInformation();
      }
else
    {
      this.pageIndex++;
      this.isInquiryOfRequest=false;
    }
  
}

fillIndivdualInteriorRequest(requestBody){
  if(requestBody.personalDetails)
   this.requestInteriorIndividual.personalDetails=requestBody.personalDetails;
  else
   this.requestInteriorIndividual.personalDetails=new PersonalDetails();

  if(requestBody.addressCollection)
   this.requestInteriorIndividual.addressCollection=requestBody.addressCollection;
  else
    this.requestInteriorIndividual.addressCollection=new Array<AddressDetails>();
  
  if(requestBody.workingDetails)
   this.requestInteriorIndividual.workingDetails=requestBody.workingDetails;
  else
    this.requestInteriorIndividual.workingDetails=new workingDetails();

  if(requestBody.identityCollection)
   this.requestInteriorIndividual.identityCollection=requestBody.identityCollection;
  else
    this.requestInteriorIndividual.identityCollection=new Array<IdentityDetails>();

  if(requestBody.financialDetails)
   this.requestInteriorIndividual.financialDetails=requestBody.financialDetails;
  else
    this.requestInteriorIndividual.financialDetails=new FinancialDetails();

  if(requestBody.bankDetails)
    this.requestInteriorIndividual.bankDetails=requestBody.bankDetails;
  else
    this.requestInteriorIndividual.bankDetails=new Array<BankDetails>();

  if(requestBody.commitmentDetails)
    this.requestInteriorIndividual.commitmentDetails=requestBody.commitmentDetails;
  else
    this.requestInteriorIndividual.commitmentDetails=new CommitmentDetailsComponent();
}


public setInformationToRequest(requestBody?){

  switch (this.initialParameter.customerType.id) {
    case 1:
      this.customerTypeDescription = "InteriorIndividual";
      if(requestBody!==undefined && requestBody!==null)
        this.fillIndivdualInteriorRequest(requestBody);
      this.requestInteriorIndividual.personalDetails.nationalCode = this.initialParameter.nationalCode;

      this.clickedCustomerType.emit('InteriorIndividual');
      this.isInquiryOfRequest=false;

      break;
    case 2:
      this.customerTypeDescription = "ExteriorIndividual";
      this.clickedCustomerType.emit('ExteriorIndividual');

      break;
    case 3:
      this.customerTypeDescription = "InteriorLegal";
      if(requestBody!==undefined && requestBody!==null)
        this.fillLegalInteriorRequest(requestBody);
      this.requestInteriorLegal.legalBasicInformation.nationalCode = this.initialParameter.nationalCode;
      this.clickedCustomerType.emit('InteriorLegal');
      this.isInquiryOfRequest=false;

      break;
    case 4:
      this.customerTypeDescription = "ExteriorLegal";
      this.clickedCustomerType.emit('ExteriorLegal');

      break;
    default:
      break;
  }


}

  fillLegalInteriorRequest(requestBody){
 

    if(requestBody.legalBasicInformation)
      this.requestInteriorLegal.legalBasicInformation=requestBody.legalBasicInformation;
    else
      this.requestInteriorLegal.legalBasicInformation=new LegalBasicInformation();

    if(requestBody.addressCollection)
      this.requestInteriorLegal.addressCollection=requestBody.addressCollection;
    else
      this.requestInteriorLegal.addressCollection=new Array<AddressDetails>();

    if(requestBody.legalPeopleWithVotingRightCollection)
     this.requestInteriorLegal.legalPeopleWithVotingRightCollection=requestBody.legalPeopleWithVotingRightCollection;
    else
     this.requestInteriorLegal.legalPeopleWithVotingRightCollection=new Array<LegalPeopleWithVotingRight>();

    if(requestBody.identityCollection)
     this.requestInteriorLegal.identityCollection=requestBody.identityCollection;
    else{
      this.requestInteriorLegal.identityCollection=new Array<IdentityDetails>();
    }


    if(requestBody.bankAccountDelegateCollection)
     this.requestInteriorLegal.bankAccountDelegateCollection=requestBody.bankAccountDelegateCollection;
    else
      this.requestInteriorLegal.bankAccountDelegateCollection=new Array<BankAccountDelegate>();

    if(requestBody.productionInformationCollection)
     this.requestInteriorLegal.productionInformationCollection=requestBody.productionInformationCollection;
    else
     this.requestInteriorLegal.productionInformationCollection=new Array<ProductionInformation>();

    if(requestBody.financialDetails)
     this.requestInteriorLegal.financialDetails =requestBody.financialDetails ;
     else
     this.requestInteriorLegal.financialDetails=new LegalFinancialDetail();

    if(requestBody.stockholdersInformationCollection)
     this.requestInteriorLegal.stockholdersInformationCollection=requestBody.stockholdersInformationCollection;
    else
     this.requestInteriorLegal.stockholdersInformationCollection= new Array<StackeholdersInformation>();

    if(requestBody.bankDetails)
     this.requestInteriorLegal.bankDetails=requestBody.bankDetails;
    else
      this.requestInteriorLegal.bankDetails=new Array<BankDetails>();


  }

  public onPerviousPage() {
    this.sendDataToServer=false;
    if (this.pageIndex == 0){
      this.sidebarService.toggle('out');
      return;
    }
    this.pageIndex--;
  } 

  localSubscriber: Subscription;
  legalInquiry: Subscription;
  individualInquiry: Subscription;

  ngOnDestroy(): void {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }

    if (this.legalInquiry !== undefined) {
      this.legalInquiry.unsubscribe();
    }

    if (this.individualInquiry !== undefined) {
      this.individualInquiry.unsubscribe();
    }
    if (this.saveDraftIndividualInteriorEditOfNewRequestSubscriber !== undefined) {
      this.saveDraftIndividualInteriorEditOfNewRequestSubscriber.unsubscribe();
    }

    if (this.saveDraftIndividualInteriorNewRequestSubscriber !== undefined) {
      this.saveDraftIndividualInteriorNewRequestSubscriber.unsubscribe();
    }
    if (this.saveLegalInteriorEditOfNewRequestSubscriber !== undefined) {
      this.saveLegalInteriorEditOfNewRequestSubscriber.unsubscribe();
    }
    if (this.saveLegalInteriorNewRequestSubscriber !== undefined) {
      this.saveLegalInteriorNewRequestSubscriber.unsubscribe();
    }
    
    
    this.submitted;
  }
 



  saveDraftIndividualInteriorEditOfNewRequestSubscriber:Subscription;
  saveDraftIndividualInteriorNewRequestSubscriber:Subscription;
  saveLegalInteriorEditOfNewRequestSubscriber:Subscription;
  saveLegalInteriorNewRequestSubscriber:Subscription;
  saveRequest( ): void {
    if (this.customerTypeDescription == "InteriorIndividual")
    {

      this.requestInteriorIndividual.nationality=this.requestInteriorIndividual.personalDetails.nationality;
      this.requestInteriorIndividual.externalId=this.requestInteriorIndividual.personalDetails.nationalCode;
      this.requestInteriorIndividual.nationalCode=this.requestInteriorIndividual.personalDetails.nationalCode;
      this.requestInteriorIndividual.name=this.requestInteriorIndividual.personalDetails.firstName+' '+this.requestInteriorIndividual.personalDetails.lastName;
 
 

      if(this.mode==='edit'){
        this.saveDraftIndividualInteriorEditOfNewRequestSubscriber= this.service.saveDraftIndividualInteriorEditOfNewRequest(this.requestInteriorIndividual).subscribe(result => {
          this.saveRequestOccurred.emit(result);
          this.sidebarService.toggle("out");
          this.requestInteriorIndividual=new InteriorIndividualBrokerRequest();
          this.notify.showSuccessMessageBox("درخواست پیش نویس با موفقیت انجام شد")
        },error=>{
          this.serviceServer.sendToServer(false);
   
          for (let errItemValue of Object.entries(error.error.errors)) {
            let val=errItemValue[1];
            if(errItemValue[1]!=undefined && errItemValue[1]!=null)
            {
              for (let errorMessageItem of Object.entries(val)){
                this.notify.showErrorMessageBox(errorMessageItem[1])
              }
            }
        }}); 

        return;
      }

      this.saveDraftIndividualInteriorNewRequestSubscriber=this.service.saveDraftIndividualInteriorNewRequest(this.requestInteriorIndividual).subscribe(result => {
        this.saveRequestOccurred.emit(result);
        this.sidebarService.toggle("out");
        this.requestInteriorIndividual=new InteriorIndividualBrokerRequest();
        this.notify.showSuccessMessageBox("درخواست پیش نویس با موفقیت انجام شد")
      },error=>{
        this.serviceServer.sendToServer(false);
        this.requestInteriorIndividual.personalDetails.birthDate = this.requestInteriorIndividual.personalDetails.persianBirthBirthDate;
        this.requestInteriorIndividual.workingDetails.jobDate=this.requestInteriorIndividual.workingDetails.persianJobDate;

        for (let errItemValue of Object.entries(error.error.errors)) {
          let val=errItemValue[1];
          if(errItemValue[1]!=undefined && errItemValue[1]!=null)
          {
            for (let errorMessageItem of Object.entries(val)){
              this.notify.showErrorMessageBox(errorMessageItem[1])
            }
          }
      }}); 
    }

      if (this.customerTypeDescription == "InteriorLegal")
      {
 
        this.requestInteriorLegal.nationality=this.requestInteriorLegal.legalBasicInformation.nationality;
        this.requestInteriorLegal.externalId=this.requestInteriorLegal.legalBasicInformation.nationalCode;
        this.requestInteriorLegal.nationalId=this.requestInteriorLegal.legalBasicInformation.nationalCode;
        this.requestInteriorLegal.name=this.requestInteriorLegal.legalBasicInformation.companyName;


        if(this.mode==='edit'){
                  this.saveLegalInteriorEditOfNewRequestSubscriber=this.service.saveLegalInteriorEditOfNewRequest(this.requestInteriorLegal).subscribe(result => {
                  this.saveRequestOccurred.emit(result);
                  this.sidebarService.toggle("out");
                  this.requestInteriorLegal=new InteriorLegalBrokerRequest();
                  this.notify.showSuccessMessageBox("درخواست پیش نویس با موفقیت انجام شد");
                  return;


                },error=>{
                this.serviceServer.sendToServer(false);

                  for (let errItemValue of Object.entries(error.error.errors)) {
                    let val=errItemValue[1];
                    if(errItemValue[1]!=undefined && errItemValue[1]!=null)
                    {
                      for (let errorMessageItem of Object.entries(val)){
                        this.notify.showErrorMessageBox(errorMessageItem[1])
                      }
                    }
                }
              });

  
              return;

        }

        this.saveLegalInteriorNewRequestSubscriber=  this.service.saveLegalInteriorNewRequest(this.requestInteriorLegal).subscribe(result => {
          this.saveRequestOccurred.emit(result);
          this.sidebarService.toggle("out");
          this.requestInteriorLegal=new InteriorLegalBrokerRequest();
          this.notify.showSuccessMessageBox("درخواست پیش نویس با موفقیت انجام شد")

        },error=>{
        this.serviceServer.sendToServer(false);
 
          for (let errItemValue of Object.entries(error.error.errors)) {
            let val=errItemValue[1];
            if(errItemValue[1]!=undefined && errItemValue[1]!=null)
            {
              for (let errorMessageItem of Object.entries(val)){
                this.notify.showErrorMessageBox(errorMessageItem[1])
              }
            }
        }
      });



      }

      
    

  }
    getSpecialProperty<TModel, TKey extends keyof TModel>(
    model: TModel,
    key: TKey
  ) {
    return model[key];
  }
  index = 1;

  showerrorHandler(error){
   
    if(error.status==0){
      this.notify.showErrorMessageBoxWithDuplicate("خطای سرور: سرویس از دسترس خارج می باشد!");
      return;
    }

    for (let errItemValue of Object.entries(error.error.errors)) {
      let val=errItemValue[1];
      if(errItemValue[1]!=undefined && errItemValue[1]!=null)
      {
        for (let errorMessageItem of Object.entries(val)){
          this.notify.showErrorMessageBox(errorMessageItem[1])
        }
      }
    }
  }



}
