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
import { InteriorLegalBrokerRequest } from "../../Models/CustomersModels/Common/interiorLegalBrokerRequest";
import { InteriorIndividualBrokerRequest } from "../../Models/CustomersModels/Common/interiorIndividualBrokerRequest";
import { BrokerRequestParameter } from "../../Models/Misc/BrokerRequestParameter";
import { NotifyManagement } from "../../shared/NotifyManagement";
import { BrokerRequestsService } from "../../services/broker-requests.service";
import { SidebarService } from "../../SlideInOutModule/sidebar.service";
import { CustomerType } from "../../Models/CustomersModels/Common/customerType";
import { assignRequestResult } from "../../Models/Misc/assignRequestResult";
import { AddressDetails } from "../../Models/CustomersModels/Individual/addressDetails";
import { PersonalDetails } from "../../Models/CustomersModels/Individual/personalDetails";
import { workingDetails } from "../../Models/CustomersModels/Individual/workingDetails";
import { IdentityDetails } from "../../Models/CustomersModels/Individual/identityDetails";
import { FinancialDetails } from "../../Models/CustomersModels/Individual/financialDetails";
import { BankDetails } from "../../Models/CustomersModels/Individual/bankeDetails";
import { CommitmentDetailsComponent } from "../../shareComponentModule/commitment-details/commitment-details.component";
import { LegalBasicInformation } from "../../Models/CustomersModels/Legal/legalBasicInformation";
import { LegalPeopleWithVotingRight } from "../../Models/CustomersModels/Common/legalPeopleWithVoting";
import { BankAccountDelegate } from "../../Models/CustomersModels/Common/bankAccountDelegate";
import { ProductionInformation } from "../../Models/CustomersModels/Common/productionInformation";
import { LegalFinancialDetail } from "../../Models/CustomersModels/Common/legalFinancialDetail";
import { StackeholdersInformation } from "../../Models/CustomersModels/Common/stackHoldersInformation";
import { Subscription } from "rxjs";
import { PublicBrokerRequest } from './../../Models/CustomersModels/Common/publicBrokerRequest';

@Component({
  selector: "ngx-view-request",
  templateUrl: "./view-request.component.html",
  styleUrls: ["./view-request.component.scss"],
})
export class ViewRequestComponent implements OnInit, OnDestroy {
  errorDescription: string = "";
  // request: brokerRequest = new brokerRequest();
  // requestInteriorIndividual: InteriorIndividualBrokerRequest = new InteriorIndividualBrokerRequest();
  requestInteriorLegal: InteriorLegalBrokerRequest = new InteriorLegalBrokerRequest();
  requestInteriorIndividual: InteriorIndividualBrokerRequest = new InteriorIndividualBrokerRequest();
  requestPublic:PublicBrokerRequest=new PublicBrokerRequest();
  status = "";
  headerTitle = "";

  uniqueLabel = "---";
  @Input() requestObject: any;
  @Input() customerType: CustomerTypeEnum;
  @Output() clickedSaveRequest = new EventEmitter<any>();
  @Output() clickedCustomerType = new EventEmitter<any>();

  customerTypeDescription = "";
  requestForm: FormGroup;
  isNationalCodeIsvalid = false;
  initialParameter: BrokerRequestParameter = new BrokerRequestParameter();
  @ViewChild("myModal", { static: false }) myModal;
  @Output() saveRequestOccurred: EventEmitter<any> = new EventEmitter();
  @Output() requestStatusChanged: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private notify: NotifyManagement,
  ) {}
  submitted = false;
  nationalCodeLength = 10;
  maskTxt = "0000000000";

  ngOnInit() {
    this.setRequestForm();

    var individualInterior = new CustomerType();
      console.log(this.customerType)
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

    if (this.customerType == CustomerTypeEnum.public) {

      
      this.requestPublic = this.requestObject;
   
      this.initialParameter.nationalCode = this.requestPublic.externalId;
      this.customerTypeDescription = "Public";
      this.customerTypeChangedValue(CustomerTypeEnum.public);
      this.setHeaderTitle();
    }

    individualInterior.id = this.customerType.valueOf();
    this.initialParameter.customerType = individualInterior;

    this.setHeaderTitle();
 
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
  public pageIndex = 1;

  customerTypeChangedValue(id) {
    if (id == CustomerTypeEnum.individualInterior) {
      this.nationalCodeLength = 10;
      this.maskTxt = "0000000000";
      this.uniqueLabel = "کد ملی";
    } else if (id == CustomerTypeEnum.legalInterior) {
      this.nationalCodeLength = 11;
      this.maskTxt = "00000000000";
      this.uniqueLabel = "شناسه ملی";
    }
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
    this.pageIndex++;
    this.setHeaderTitle();

  }

  errorNotify(error) {
    console.error(error);
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

  public onPerviousPage() {
    if (this.pageIndex == 1) return;

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

    this.submitted;
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

    if (!error || !error.error || !error.error.errors) {
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

  setHeaderTitle() {
    switch (this.customerTypeDescription) {
      case "InteriorLegal":
        this.getheaderTitleIranianLegal();
        break;

        case "Public":
          this.getheaderTitleIranianLegal();
          break;

      case "InteriorIndividual":
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

  getheaderTitleIranianLegal() {
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
