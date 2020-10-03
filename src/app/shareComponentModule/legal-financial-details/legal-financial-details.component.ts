import { LegalFinancialDetail } from "../../Models/CustomersModels/Common/legalFinancialDetail";
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  OnDestroy,
} from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { PersonalDetails } from "../../Models/CustomersModels/Individual/personalDetails";
import { NotifyManagement } from '../../shared/NotifyManagement';

@Component({
  selector: "app-legal-financial-details",
  templateUrl: "./legal-financial-details.component.html",
  styleUrls: ["./legal-financial-details.component.css"],
})
export class LegalFinancialDetailsComponent implements OnInit, OnDestroy {
  submitted = false;
  requestForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private notify: NotifyManagement,) {}
  @Input() financialDetail: LegalFinancialDetail = new LegalFinancialDetail();
  @Input() isViewMode: boolean = false;
  @Input() customerType: CustomerTypeEnum = CustomerTypeEnum.UnKnown;

  ngOnDestroy(): void {}

  ngOnInit() {

    console.log(this.customerType)

    if(this.customerType==CustomerTypeEnum.legalInterior){
      this.requestForm = this.formBuilder.group({
        totalAssetsBasedOnTheLatestFinancialStatements: ["", Validators.required],
        recordingCapitalBasedOnTheLatestOfficialNewspaper: [
          "",
          Validators.required,
        ],
        totalSalaryOfStockOwnerBasedOnTheLatestFinancialStatements: [
          "",
          Validators.required,
        ],
        totalBuysLastYearBasedOnTheLatestFinancialStatements: [
          "",
          Validators.required,
        ],
        netSalesAndGrossContractRevenueBasedOnTheLatestFinancialStatements: [
          "",
          Validators.required,
        ],
        isTheCustomerRankedByReference: [""],
        ratingReferenceName: ["", Validators.required],
        ratingNumber: ["", Validators.required],
        auctionMarket: [""],
        futureMarket: [""],
        ratingDate: [""],
        currency: ["", Validators.required],
        auctionMarketValue: ["", Validators.required],
        futureMarketValue: ["", Validators.required],
      });
    }
    else if(this.customerType==CustomerTypeEnum.public) {
      this.requestForm = this.formBuilder.group({
        totalAssetsBasedOnTheLatestFinancialStatements: ["",],
        recordingCapitalBasedOnTheLatestOfficialNewspaper: [
          "",
         
        ],
        totalSalaryOfStockOwnerBasedOnTheLatestFinancialStatements: [
          "",
         
        ],
        totalBuysLastYearBasedOnTheLatestFinancialStatements: [
          "",
         
        ],
        netSalesAndGrossContractRevenueBasedOnTheLatestFinancialStatements: [
          "",
         
        ],
        isTheCustomerRankedByReference: [""],
        ratingReferenceName: ["", Validators.required],
        ratingNumber: ["", Validators.required],
        auctionMarket: [""],
        futureMarket: [""],
        ratingDate: [""],
        currency: ["", Validators.required],
        auctionMarketValue: ["", Validators.required],
        futureMarketValue: ["", Validators.required],
      });
    }
  
  }

  get ctrl() {
    return this.requestForm.controls;
  }

  @Output() clickedNext = new EventEmitter<void>();
  @Output() clickedPrevious = new EventEmitter<void>();
  errortotalAssetsBasedOnTheLatestFinancialStatements = "";
  errorrecordingCapitalBasedOnTheLatestOfficialNewspaper = "";
  errortotalSalaryOfStockOwnerBasedOnTheLatestFinancialStatements = "";
  onSubmit() {

    if(this.customerType==CustomerTypeEnum.legalInterior){
      if (
        this.financialDetail.totalAssetsBasedOnTheLatestFinancialStatements == 0
      ) {
        this.errortotalAssetsBasedOnTheLatestFinancialStatements =
          "مقدار جــمـــع دارایــی شـــرکـت بــر اســاس آخــرین صــورت هــای مـالی نمی تواند صفر درج شود";
        return;
      }
  
      if (
        this.financialDetail.recordedCapitalBasedOnTheLatestOfficialNewspaper == 0
      ) {
        this.errorrecordingCapitalBasedOnTheLatestOfficialNewspaper =
          "مقدار ســــرمـــایـــه ثــبــی بـــر اســـاس آخـــریــن روزنـــامــــه رســـمــی نمی تواند صفر درج شود";
        return;
      }
  
      if (
        this.financialDetail
          .totalSalaryOfStockOwnerBasedOnTheLatestFinancialStatements == 0
      ) {
        this.errortotalSalaryOfStockOwnerBasedOnTheLatestFinancialStatements =
          "مقدار حقوق صاحبـان سـهـام بـر اســاس آخـریــن صورت هـای مـالـی نمی تواند صفر درج شود";
        return;
      }
    }

    if(this.financialDetail.isFutureMarket==false && this.financialDetail.isSpotMarket==false){
      this.notify.showErrorMessageBoxWithDuplicate("لازم است یکی از بازارها را برای ادامه انتخاب کنید");
      return;
    }

    this.submitted = true;
    if (this.requestForm.invalid) {
      return;
    }

    if (!this.financialDetail.isTheCustomerRankedByReference)
      this.financialDetail.ratingDate = "";

    this.clickedNext.emit();
  }

  onPrevious() {
    if (!this.financialDetail.isTheCustomerRankedByReference)
      this.financialDetail.ratingDate = "";

    this.clickedPrevious.emit();
  }
}
