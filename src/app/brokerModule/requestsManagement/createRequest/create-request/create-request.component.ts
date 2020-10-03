import { FinancialDetails } from "./../../../../Models/CustomersModels/Individual/financialDetails";
import { ProductionInformation } from "./../../../../Models/CustomersModels/Common/productionInformation";
import { LegalPeopleWithVotingRight } from "./../../../../Models/CustomersModels/Common/legalPeopleWithVoting";
import { LegalBasicInformation } from "./../../../../Models/CustomersModels/Legal/legalBasicInformation";
import { CustomerType } from "./../../../../Models/CustomersModels/Common/customerType";
import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  ViewChild,
  Input,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BrokerRequestsService } from "../../../../services/broker-requests.service";
import { Subscription } from "rxjs";
import { InteriorIndividualBrokerRequest } from "../../../../Models/CustomersModels/Common/interiorIndividualBrokerRequest";
import { BrokerRequestParameter } from "../../../../Models/Misc/BrokerRequestParameter";
import { InteriorLegalBrokerRequest } from "../../../../Models/CustomersModels/Common/interiorLegalBrokerRequest";
import { SidebarService } from "../../../../SlideInOutModule/sidebar.service";
import { NotifyManagement } from "../../../../shared/NotifyManagement";
import { AddressDetails } from "../../../../Models/CustomersModels/Individual/addressDetails";
import { IdentityDetails } from "../../../../Models/CustomersModels/Individual/identityDetails";
import { BankAccountDelegate } from "../../../../Models/CustomersModels/Common/bankAccountDelegate";
import { LegalFinancialDetail } from "../../../../Models/CustomersModels/Common/legalFinancialDetail";
import { StackeholdersInformation } from "../../../../Models/CustomersModels/Common/stackHoldersInformation";
import { BankDetails } from "../../../../Models/CustomersModels/Individual/bankeDetails";
import { PersonalDetails } from "../../../../Models/CustomersModels/Individual/personalDetails";
import { workingDetails } from "../../../../Models/CustomersModels/Individual/workingDetails";
import { CommitmentDetailsComponent } from "../../../../shareComponentModule/commitment-details/commitment-details.component";
import { assignRequestResult } from "../../../../Models/Misc/assignRequestResult";
import { PublicBrokerRequest } from '../../../../Models/CustomersModels/Common/publicBrokerRequest';

@Component({
  selector: "app-create-request",
  templateUrl: "./create-request.component.html",
  styleUrls: ["./create-request.component.css"],
})
export class CreateRequestComponent implements OnInit, OnDestroy {
  errorDescription: string = "";
  // request: brokerRequest = new brokerRequest();
  // requestInteriorIndividual: InteriorIndividualBrokerRequest = new InteriorIndividualBrokerRequest();
  requestInteriorLegal: InteriorLegalBrokerRequest = new InteriorLegalBrokerRequest();
  requestPublic: PublicBrokerRequest = new PublicBrokerRequest();

  requestInteriorIndividual: InteriorIndividualBrokerRequest = new InteriorIndividualBrokerRequest();

  isInquiryOfRequest = false;
  status = "";
  headerTitle = "";

  uniqueLabel = "---";
  @Input() requestObject: any;
  @Input() mode: string;
  @Input() customerType: CustomerTypeEnum;
  @Output() clickedSaveRequest = new EventEmitter<any>();
  @Output() clickedCustomerType = new EventEmitter<any>();

  customerTypeDescription = "";
  requestForm: FormGroup;
  isNationalCodeIsvalid = false;
  sendDataToServer = false;
  initialParameter: BrokerRequestParameter = new BrokerRequestParameter();
  @ViewChild("myModal", { static: false }) myModal;
  @Output() saveRequestOccurred: EventEmitter<any> = new EventEmitter();
  @Output() requestStatusChanged: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private notify: NotifyManagement,
    private service: BrokerRequestsService,
    private sidebarService: SidebarService,
    private serviceServer: SidebarService
  ) {}
  submitted = false;
  nationalCodeLength = 10;
  maskTxt = "0000000000";

  ngOnInit() {
    this.setRequestForm();
    this.sendDataToServer = false;
    var individualInterior = new CustomerType();

    individualInterior.id = this.customerType.valueOf();
    this.initialParameter.customerType = individualInterior;

    // this.requestInteriorIndividual = new InteriorIndividualBrokerRequest();
    if (this.customerType == CustomerTypeEnum.individualInterior) {
      this.requestInteriorIndividual = this.requestObject;
      this.initialParameter.nationalCode = this.requestInteriorIndividual.externalId;
      this.customerTypeDescription = "InteriorIndividual";
      this.customerTypeChangedValue(CustomerTypeEnum.individualInterior);
    }

    if (this.customerType == CustomerTypeEnum.legalInterior) {
      this.requestInteriorLegal = this.requestObject;
      this.initialParameter.nationalCode = this.requestInteriorLegal.externalId;
      this.customerTypeDescription = "InteriorLegal";
      this.customerTypeChangedValue(CustomerTypeEnum.legalInterior);
    }

    if (this.customerType == CustomerTypeEnum.legalExterior) {
      this.customerTypeDescription = "ExteriorLegal";
      this.customerTypeChangedValue(CustomerTypeEnum.legalExterior);
    }

    if (this.customerType == CustomerTypeEnum.individualExterior) {
      this.customerTypeDescription = "ExteriorIndividual";
      this.customerTypeChangedValue(CustomerTypeEnum.individualExterior);
    }

    if (this.customerType == CustomerTypeEnum.public) {
      this.requestPublic = this.requestObject;
      this.initialParameter.nationalCode = this.requestPublic.externalId;
      this.customerTypeDescription = "Public";
      this.customerTypeChangedValue(CustomerTypeEnum.public);
    }




    if (this.mode === "add")
      this.initialParameter = new BrokerRequestParameter();
  }

  setRequestForm() {
    this.requestForm = this.formBuilder.group({
      customerType: ["", Validators.required],
      customerCode: ["", [Validators.required]],
    });
  }

  get ctrl() {
    return this.requestForm.controls;
  }
  public pageIndex = 0;
  customerTypeChangedValue(id) {

    if (id == CustomerTypeEnum.individualInterior) {
      this.nationalCodeLength = 10;
      this.maskTxt = "0000000000";
      this.uniqueLabel = "کد ملی";
      this.customerType=CustomerTypeEnum.individualInterior;
    } else if (id == CustomerTypeEnum.legalInterior) {
      this.nationalCodeLength = 11;
      this.maskTxt = "00000000000";
      this.uniqueLabel = "شناسه ملی";
      this.customerType=CustomerTypeEnum.legalInterior;

    }
    else if (id == CustomerTypeEnum.public) {
      this.nationalCodeLength = 11;
      this.maskTxt = "00000000000";
      this.uniqueLabel = "شناسه ملی";
      this.customerType=CustomerTypeEnum.public;

    }
      else if (id == CustomerTypeEnum.individualExterior) {
      this.nationalCodeLength = 9;
      this.maskTxt = "000000000";
      this.uniqueLabel = "کد فیدا";
      this.customerType=CustomerTypeEnum.individualExterior;

    }

    else if (id == CustomerTypeEnum.legalExterior) {
      this.nationalCodeLength = 9;
      this.maskTxt = "000000000";
      this.uniqueLabel = "کد فیدا";
      this.customerType=CustomerTypeEnum.legalExterior;

    }

    console.log(this.customerType)
  }

  public fillAssignObject(result): assignRequestResult {
    let assignItem: assignRequestResult = new assignRequestResult();
    assignItem.status = this.status;
    if (result.name) assignItem.name = result.name;
    if (result.externalId) assignItem.externalId = result.externalId;
    if (result.derivativesMarket)
      assignItem.derivativesMarket = result.derivativesMarket;
    if (result.spotMarket) assignItem.spotMarket = result.spotMarket;

    return assignItem;
  }

  onNextPage() {
    this.errorDescription = "";

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

      this.localSubscriber = this.service
        .chekIsExistExternalIdWithBriefInformation(
          this.initialParameter.nationalCode
        )
        .subscribe(
          (result) => {
            this.sendDataToServer = false;
            this.isInquiryOfRequest = false;
            console.log(result);
            
            if (!result) {
              this.allowNextPage();
              return;
            }

            if (result.isBroker == undefined || result.isBroker == null) {
              this.notify.showErrorMessageBox(
                "در زمان استعلام شناسه خطای سمت سرور با شناسه کارگزار رخ داده است"
              );
              return;
            }

            if (result.isBorker) {
              this.status = "deleteMode";
              let assignItem: assignRequestResult = new assignRequestResult();
              assignItem = this.fillAssignObject(result);

              this.sidebarService.toggle("out");
              this.requestStatusChanged.emit(assignItem);
              return;
            }

            if (!result.isBorker) {
              this.status = "assignMode";
              let assignItem: assignRequestResult = new assignRequestResult();
              assignItem = this.fillAssignObject(result);

              this.sidebarService.toggle("out");
              this.requestStatusChanged.emit(assignItem);
              return;
            }
          },
          (error) => {
            this.sendDataToServer = false;
            this.isInquiryOfRequest = false;
            console.error(error);
            console.error(error.status);
            console.error(status);
            
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
                  this.errorDescription = errorMessageItem[1];
                }
              }
            }
          }
        );
    } else this.allowNextPage();
  }

  errorNotify(error) {
    
    if (error.status == 0) {
      this.notify.showErrorMessageBoxWithDuplicate(
        "خطای سرور: سرویس از دسترس خارج می باشد!"
      );
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
          this.notify.showErrorMessageBox(errorMessageItem[1]);
        }
      }
    }
  }

  inquiryRequestInformation() {
  
    this.isInquiryOfRequest = true;
    switch (this.initialParameter.customerType.id) {

      case CustomerTypeEnum.individualInterior:
        this.individualInquiry = this.service
          .getInquiryOfRequest(
            CustomerTypeEnum.individualInterior,
            this.initialParameter.nationalCode
          )
          .subscribe(
            (reult) => {
              this.setInformationToRequest(reult);
              this.pageIndex++;
              this.setHeaderTitle();
            },
            (error) => {
              this.sendDataToServer = false;
              this.isInquiryOfRequest = false;
              this.showerrorHandler(error);
              this.errorNotify(error);
            }
          );
        break;


        case CustomerTypeEnum.individualExterior:
          this.individualInquiry = this.service
            .getInquiryOfRequest(
              CustomerTypeEnum.individualExterior,
              this.initialParameter.nationalCode
            )
            .subscribe(
              (reult) => {
                this.setInformationToRequest(reult);
                this.pageIndex++;
                this.setHeaderTitle();
              },
              (error) => {
                this.sendDataToServer = false;
                this.isInquiryOfRequest = false;

                this.showerrorHandler(error);
                this.errorNotify(error);
              }
            );
          break;


          case CustomerTypeEnum.legalExterior:
            this.individualInquiry = this.service
              .getInquiryOfRequest(
                CustomerTypeEnum.legalExterior,
                this.initialParameter.nationalCode
              )
              .subscribe(
                (reult) => {
                  this.setInformationToRequest(reult);
                  this.pageIndex++;
                  this.setHeaderTitle();
                },
                (error) => {
                  this.sendDataToServer = false;
                  this.isInquiryOfRequest = false;
                  this.showerrorHandler(error);
                  this.errorNotify(error);
                }
              );
            break;


      case CustomerTypeEnum.legalInterior:
        this.legalInquiry = this.service
          .getInquiryOfRequest(
            CustomerTypeEnum.legalInterior,
            this.initialParameter.nationalCode
          )
          .subscribe(
            (reult) => {
              this.setInformationToRequest(reult);
              this.pageIndex++;
              this.setHeaderTitle();

            },
            (error) => {
              this.isInquiryOfRequest = false;
              this.showerrorHandler(error);
              this.errorNotify(error);
            }
          );
        break;

        case CustomerTypeEnum.public:
          this.legalInquiry = this.service
            .getInquiryOfRequest(
              CustomerTypeEnum.public,
              this.initialParameter.nationalCode
            )
            .subscribe(
              (reult) => {
                this.setInformationToRequest(reult);
                this.pageIndex++;
                this.setHeaderTitle();
  
              },
              (error) => {
                this.isInquiryOfRequest = false;
                this.showerrorHandler(error);
                this.errorNotify(error);
              }
            );
          break;


      default:
        this.setInformationToRequest();
        break;
    }
  }

  allowNextPage() {
    this.submitted = true;
    if (this.requestForm.invalid) {
      return;
    }

    if (this.mode == "edit") {
      this.pageIndex++;
      this.setHeaderTitle();
      return;
    }

    if (this.pageIndex == 0) {
      this.inquiryRequestInformation();
    } else {
      this.pageIndex++;
      this.setHeaderTitle();

      this.isInquiryOfRequest = false;
    }
  }

  fillIndivdualInteriorRequest(requestBody) {
    if (requestBody.personalDetails)
      this.requestInteriorIndividual.personalDetails =
        requestBody.personalDetails;
    else this.requestInteriorIndividual.personalDetails = new PersonalDetails();

    if (requestBody.addressCollection)
      this.requestInteriorIndividual.addressCollection =
        requestBody.addressCollection;
    else
      this.requestInteriorIndividual.addressCollection = new Array<
        AddressDetails
      >();

    if (requestBody.workingDetails)
      this.requestInteriorIndividual.workingDetails =
        requestBody.workingDetails;
    else this.requestInteriorIndividual.workingDetails = new workingDetails();

    if (requestBody.identityCollection)
      this.requestInteriorIndividual.identityCollection =
        requestBody.identityCollection;
    else
      this.requestInteriorIndividual.identityCollection = new Array<
        IdentityDetails
      >();

    if (requestBody.financialDetails)
      this.requestInteriorIndividual.financialDetails =
        requestBody.financialDetails;
    else
      this.requestInteriorIndividual.financialDetails = new FinancialDetails();

    if (requestBody.bankDetails)
      this.requestInteriorIndividual.bankDetails = requestBody.bankDetails;
    else this.requestInteriorIndividual.bankDetails = new Array<BankDetails>();

    if (requestBody.commitmentDetails)
      this.requestInteriorIndividual.commitmentDetails =
        requestBody.commitmentDetails;
    else
      this.requestInteriorIndividual.commitmentDetails = new CommitmentDetailsComponent();
  }

  public setInformationToRequest(requestBody?) {
    this.customerType=this.initialParameter.customerType.id;

    switch (this.initialParameter.customerType.id) {
      case 1:
        this.customerTypeDescription = "InteriorIndividual";
        if (requestBody !== undefined && requestBody !== null)
          this.fillIndivdualInteriorRequest(requestBody);
        this.requestInteriorIndividual.personalDetails.nationalCode = this.initialParameter.nationalCode;

        this.clickedCustomerType.emit("InteriorIndividual");
        this.isInquiryOfRequest = false;
        break;
      case 2:
        this.customerTypeDescription = "ExteriorIndividual";
        this.clickedCustomerType.emit("ExteriorIndividual");

        break;
      case 3:
        this.customerTypeDescription = "InteriorLegal";
        if (requestBody !== undefined && requestBody !== null)
          this.fillLegalInteriorRequest(requestBody);
        this.requestInteriorLegal.legalBasicInformation.nationalCode = this.initialParameter.nationalCode;
        this.clickedCustomerType.emit("InteriorLegal");
        this.isInquiryOfRequest = false;

        break;
      case 4:
        this.customerTypeDescription = "ExteriorLegal";
        this.clickedCustomerType.emit("ExteriorLegal");
        break;

      case 5:
          this.customerTypeDescription = "Public";
        

          if (requestBody !== undefined && requestBody !== null)
          this.fillPublicRequest(requestBody);
          this.requestPublic.legalBasicInformation.nationalCode = this.initialParameter.nationalCode;
          this.clickedCustomerType.emit("Public");
          this.isInquiryOfRequest = false;

      break;

      default:
        break;
    }
  }

  fillLegalInteriorRequest(requestBody) {
    if (requestBody.legalBasicInformation)
      this.requestInteriorLegal.legalBasicInformation =
        requestBody.legalBasicInformation;
    else
      this.requestInteriorLegal.legalBasicInformation = new LegalBasicInformation();

    if (requestBody.addressCollection)
      this.requestInteriorLegal.addressCollection =
        requestBody.addressCollection;
    else
      this.requestInteriorLegal.addressCollection = new Array<AddressDetails>();

    if (requestBody.legalPeopleWithVotingRightCollection)
      this.requestInteriorLegal.legalPeopleWithVotingRightCollection =
        requestBody.legalPeopleWithVotingRightCollection;
    else
      this.requestInteriorLegal.legalPeopleWithVotingRightCollection = new Array<
        LegalPeopleWithVotingRight
      >();

    if (requestBody.identityCollection)
      this.requestInteriorLegal.identityCollection =
        requestBody.identityCollection;
    else {
      this.requestInteriorLegal.identityCollection = new Array<
        IdentityDetails
      >();
    }

    if (requestBody.bankAccountDelegateCollection)
      this.requestInteriorLegal.bankAccountDelegateCollection =
        requestBody.bankAccountDelegateCollection;
    else
      this.requestInteriorLegal.bankAccountDelegateCollection = new Array<
        BankAccountDelegate
      >();

    if (requestBody.productionInformationCollection)
      this.requestInteriorLegal.productionInformationCollection =
        requestBody.productionInformationCollection;
    else
      this.requestInteriorLegal.productionInformationCollection = new Array<
        ProductionInformation
      >();

    if (requestBody.financialDetails)
      this.requestInteriorLegal.financialDetails = requestBody.financialDetails;
    else
      this.requestInteriorLegal.financialDetails = new LegalFinancialDetail();

    if (requestBody.stockholdersInformationCollection)
      this.requestInteriorLegal.stockholdersInformationCollection =
        requestBody.stockholdersInformationCollection;
    else
      this.requestInteriorLegal.stockholdersInformationCollection = new Array<
        StackeholdersInformation
      >();

    if (requestBody.bankDetails)
      this.requestInteriorLegal.bankDetails = requestBody.bankDetails;
    else this.requestInteriorLegal.bankDetails = new Array<BankDetails>();
  }


  fillPublicRequest(requestBody) {
    if (requestBody.legalBasicInformation)
      this.requestPublic.legalBasicInformation =
        requestBody.legalBasicInformation;
    else
      this.requestPublic.legalBasicInformation = new LegalBasicInformation();

    if (requestBody.addressCollection)
      this.requestPublic.addressCollection =
        requestBody.addressCollection;
    else
      this.requestPublic.addressCollection = new Array<AddressDetails>();

    if (requestBody.legalPeopleWithVotingRightCollection)
      this.requestPublic.legalPeopleWithVotingRightCollection =
        requestBody.legalPeopleWithVotingRightCollection;
    else
      this.requestPublic.legalPeopleWithVotingRightCollection = new Array<
        LegalPeopleWithVotingRight
      >();

    if (requestBody.identityCollection)
      this.requestPublic.identityCollection =
        requestBody.identityCollection;
    else {
      this.requestPublic.identityCollection = new Array<
        IdentityDetails
      >();
    }

    if (requestBody.bankAccountDelegateCollection)
      this.requestPublic.bankAccountDelegateCollection =
        requestBody.bankAccountDelegateCollection;
    else
      this.requestPublic.bankAccountDelegateCollection = new Array<
        BankAccountDelegate
      >();

    if (requestBody.productionInformationCollection)
      this.requestPublic.productionInformationCollection =
        requestBody.productionInformationCollection;
    else
      this.requestPublic.productionInformationCollection = new Array<
        ProductionInformation
      >();

    if (requestBody.financialDetails)
      this.requestPublic.financialDetails = requestBody.financialDetails;
    else
      this.requestPublic.financialDetails = new LegalFinancialDetail();

    if (requestBody.stockholdersInformationCollection)
      this.requestPublic.stockholdersInformationCollection =
        requestBody.stockholdersInformationCollection;
    else
      this.requestPublic.stockholdersInformationCollection = new Array<
        StackeholdersInformation
      >();

    if (requestBody.bankDetails)
      this.requestPublic.bankDetails = requestBody.bankDetails;
    else this.requestPublic.bankDetails = new Array<BankDetails>();
  }

  public onPerviousPage() {

    this.sendDataToServer = false;
    if (this.pageIndex == 0) {
      this.sidebarService.toggle("out");
      return;
    }
    this.pageIndex--;
    this.setHeaderTitle();

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

    if (this.savePublicEditOfNewRequestSubscriber !== undefined) {
      this.savePublicEditOfNewRequestSubscriber.unsubscribe();
    }

    if (this.savePublicNewRequestSubscriber !== undefined) {
      this.savePublicNewRequestSubscriber.unsubscribe();
    }
    
    
   
    this.submitted;
  }
  saveDraftIndividualInteriorEditOfNewRequestSubscriber: Subscription;
  saveDraftIndividualInteriorNewRequestSubscriber: Subscription;
  saveLegalInteriorEditOfNewRequestSubscriber: Subscription;
  saveLegalInteriorNewRequestSubscriber: Subscription;
  savePublicEditOfNewRequestSubscriber: Subscription;
  savePublicNewRequestSubscriber: Subscription;
  saveRequest(): void {
    if (this.customerTypeDescription == "InteriorIndividual") {
      this.requestInteriorIndividual.nationality = this.requestInteriorIndividual.personalDetails.nationality;
      this.requestInteriorIndividual.externalId = this.requestInteriorIndividual.personalDetails.nationalCode;
      this.requestInteriorIndividual.nationalCode = this.requestInteriorIndividual.personalDetails.nationalCode;
      this.requestInteriorIndividual.name =
        this.requestInteriorIndividual.personalDetails.firstName +
        " " +
        this.requestInteriorIndividual.personalDetails.lastName;
       

      if (this.mode === "edit") {
        this.saveDraftIndividualInteriorEditOfNewRequestSubscriber=  this.service.saveDraftIndividualInteriorEditOfNewRequest(
            this.requestInteriorIndividual
          )
          .subscribe(
            (result) => {
              this.saveRequestOccurred.emit(result);
              this.sidebarService.toggle("out");
              this.requestInteriorIndividual = new InteriorIndividualBrokerRequest();
              this.notify.showSuccessMessageBox(
                "درخواست پیش نویس با موفقیت انجام شد"
              );
            },
            (error) => {
              this.serviceServer.sendToServer(false);
              
              for (let errItemValue of Object.entries(error.error.errors)) {
                let val = errItemValue[1];
                if (errItemValue[1] != undefined && errItemValue[1] != null) {
                  for (let errorMessageItem of Object.entries(val)) {
                    this.notify.showErrorMessageBox(errorMessageItem[1]);
                  }
                }
              }
            }
          );

        return;
      }

      this.saveDraftIndividualInteriorNewRequestSubscriber= this.service.saveDraftIndividualInteriorNewRequest(this.requestInteriorIndividual)
        .subscribe(
          (result) => {
            this.saveRequestOccurred.emit(result);
            this.sidebarService.toggle("out");
            this.requestInteriorIndividual = new InteriorIndividualBrokerRequest();
            this.notify.showSuccessMessageBox(
              "درخواست پیش نویس با موفقیت انجام شد"
            );
          },
          (error) => {
            this.serviceServer.sendToServer(false);
            for (let errItemValue of Object.entries(error.error.errors)) {
              let val = errItemValue[1];
              if (errItemValue[1] != undefined && errItemValue[1] != null) {
                for (let errorMessageItem of Object.entries(val)) {
                  this.notify.showErrorMessageBox(errorMessageItem[1]);
                }
              }
            }
          }
        );
    }

    if (this.customerTypeDescription == "InteriorLegal") {

      this.requestInteriorLegal.nationality = this.requestInteriorLegal.legalBasicInformation.nationality;
      this.requestInteriorLegal.externalId = this.requestInteriorLegal.legalBasicInformation.nationalCode;
      this.requestInteriorLegal.nationalId = this.requestInteriorLegal.legalBasicInformation.nationalCode;
      this.requestInteriorLegal.name = this.requestInteriorLegal.legalBasicInformation.companyName;

      if (this.mode === "edit") {
        this.saveLegalInteriorEditOfNewRequestSubscriber=  this.service
          .saveLegalInteriorEditOfNewRequest(this.requestInteriorLegal)
          .subscribe(
            (result) => {
              this.saveRequestOccurred.emit(result);
              this.sidebarService.toggle("out");
              this.requestInteriorLegal = new InteriorLegalBrokerRequest();
              this.notify.showSuccessMessageBox(
                "درخواست پیش نویس با موفقیت انجام شد"
              );
              return;
            },
            (error) => {
              this.serviceServer.sendToServer(false);

              for (let errItemValue of Object.entries(error.error.errors)) {
                let val = errItemValue[1];
                if (errItemValue[1] != undefined && errItemValue[1] != null) {
                  for (let errorMessageItem of Object.entries(val)) {
                    this.notify.showErrorMessageBox(errorMessageItem[1]);
                  }
                }
              }
            }
          );

        return;
      }

      this.saveLegalInteriorNewRequestSubscriber=  this.service
        .saveLegalInteriorNewRequest(this.requestInteriorLegal)
        .subscribe(
          (result) => {
            this.saveRequestOccurred.emit(result);
            this.sidebarService.toggle("out");
            this.requestInteriorLegal = new InteriorLegalBrokerRequest();
            this.notify.showSuccessMessageBox(
              "درخواست پیش نویس با موفقیت انجام شد"
            );
          },
          (error) => {
            this.serviceServer.sendToServer(false);

            for (let errItemValue of Object.entries(error.error.errors)) {
              let val = errItemValue[1];
              if (errItemValue[1] != undefined && errItemValue[1] != null) {
                for (let errorMessageItem of Object.entries(val)) {
                  this.notify.showErrorMessageBox(errorMessageItem[1]);
                }
              }
            }
          }
        );
    }

    if (this.customerTypeDescription == "Public") {
      this.serviceServer.sendToServer(true);

      this.requestPublic.nationality = this.requestPublic.legalBasicInformation.nationality;
      this.requestPublic.externalId = this.requestPublic.legalBasicInformation.nationalCode;
      this.requestPublic.nationalId = this.requestPublic.legalBasicInformation.nationalCode;
      this.requestPublic.name = this.requestPublic.legalBasicInformation.companyName;



      if (this.mode === "edit") {
        this.savePublicEditOfNewRequestSubscriber=  this.service
          .savePublicEditOfNewRequest(this.requestPublic)
          .subscribe(
            (result) => {
              this.saveRequestOccurred.emit(result);
              this.sidebarService.toggle("out");
              this.requestPublic = new PublicBrokerRequest();
              this.notify.showSuccessMessageBox(
                "درخواست پیش نویس با موفقیت انجام شد"
              );
              return;
            },
            (error) => {
              this.serviceServer.sendToServer(false);

              for (let errItemValue of Object.entries(error.error.errors)) {
                let val = errItemValue[1];
                if (errItemValue[1] != undefined && errItemValue[1] != null) {
                  for (let errorMessageItem of Object.entries(val)) {
                    this.notify.showErrorMessageBox(errorMessageItem[1]);
                  }
                }
              }
            }
          );

        return;
      }

      this.savePublicNewRequestSubscriber=  this.service
      .savePublicNewRequest(this.requestPublic)
      .subscribe(
        (result) => {
          this.saveRequestOccurred.emit(result);
          this.sidebarService.toggle("out");
          this.requestPublic = new PublicBrokerRequest();
          this.notify.showSuccessMessageBox(
            "درخواست پیش نویس با موفقیت انجام شد"
          );
        },
        (error) => {
          this.serviceServer.sendToServer(false);

          for (let errItemValue of Object.entries(error.error.errors)) {
            let val = errItemValue[1];
            if (errItemValue[1] != undefined && errItemValue[1] != null) {
              for (let errorMessageItem of Object.entries(val)) {
                this.notify.showErrorMessageBox(errorMessageItem[1]);
              }
            }
          }
        }
      );
 
      console.log (this.requestPublic)
      this.serviceServer.sendToServer(false);

    }
  }
  getSpecialProperty<TModel, TKey extends keyof TModel>(
    model: TModel,
    key: TKey
  ) {
    return model[key];
  }
  index = 1;

  showerrorHandler(error) {
    if (error.status == 0) {
      this.notify.showErrorMessageBoxWithDuplicate(
        "خطای سرور: سرویس از دسترس خارج می باشد!"
      );
      return;
    }

    if(!(error) || !(error.error) || !(error.error.errors))
    {
      this.notify.showErrorMessageBoxWithDuplicate(
        "خطا در استعلام گیری، لطفا دوباره سعی کنید!"
      );
      return;
    }
 
 

    for (let errItemValue of Object.entries(error.error.errors)) {
      let val = errItemValue[1];
      if (errItemValue[1] != undefined && errItemValue[1] != null) {
        for (let errorMessageItem of Object.entries(val)) {
          this.notify.showErrorMessageBox(errorMessageItem[1]);
        }
      }
    }
  }


  setHeaderTitle(){
    switch (this.customerTypeDescription) {
      case 'InteriorLegal':
        this.getheaderTitleIranianLegalOrPublic();
        break;

      case 'Public':
        this.getheaderTitleIranianLegalOrPublic();
        break;

        case 'InteriorIndividual':
          this.getheaderTitleIranianIndividual();
          break;
    
      default:
        break;
    }
  }

  getheaderTitleIranianIndividual() {
    switch (this.pageIndex) {
      case 0:
        this.headerTitle = "";
        break;
      case 1:
        this.headerTitle = "اطلاعات پایه";
        break;
      case 2:
        this.headerTitle = "اطلاعات نشانی";
        break;
      case 3:
        this.headerTitle = "اطلاعات شغلی";
        break;
      case 4:
        this.headerTitle = "اطلاعات کدهای معاملاتی";
        break;
      case 5:
        this.headerTitle = "اطلاعات مالی";
        break;
      case 6:
        this.headerTitle = "اطلاعات حساب بانکی";
        break;
      default:
        break;
    }
  }

  getheaderTitleIranianLegalOrPublic() {
    switch (this.pageIndex) {
      case 0:
        this.headerTitle = "";
        break;
      case 1:
        this.headerTitle = "اطلاعات پایه";
        break;
      case 2:
        this.headerTitle = "اطلاعات نشانی";
        break;
      case 3:
        this.headerTitle = "اطلاعات کدهای معاملاتی";
        break;
      case 4:
        this.headerTitle = "اطلاعات دارندگان حق برداشت";
        break;
      case 5:
        this.headerTitle =
          "اطلاعات هیات عامل، حسابرس، بازرسان قانونی یا هیات امنا";
        break;
      case 6:
        this.headerTitle =
          "اطلاعات سهامداران یا شرکا دارای بیش از 10 درصد سهام(سرمایه)";
        break;
      case 7:
        this.headerTitle = "اطلاعات مالی";
        break;
      case 8:
        this.headerTitle =
          "اطلاعات ظرفیت کالاها طبق پروانه بهره‌برداری/سایر مجوزهای فعالیت ";
        break;
      case 9:
        this.headerTitle = "اطلاعات حساب بانکی";
        break;
      default:
        break;
    }
  }
}
