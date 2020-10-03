import { IMEDatePickerModule } from './../imedate-picker/imedate-picker.module';
import { BankComboBoxComponent } from './ComboBoxComponent/bank-combo-box/bank-combo-box.component';
import { CommitmentDetailsComponent } from './commitment-details/commitment-details.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PersonalDetailsComponent } from "./personal-details/personal-details.component";
import { PersonalWorkingDetailsComponent } from "./personal-working-details/personal-working-details.component";
import { PersonalFinancialDetailsComponent } from "./personal-financial-details/personal-financial-details.component";
import { BankDetailsComponent } from "./bank-details/bank-details.component";
import { AddressDetailsComponent } from "./address-details/address-details.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DpDatePickerModule } from "ng2-jalali-date-picker";
import { GenderComboBoxComponent } from "./ComboBoxComponent/gender-combo-box/gender-combo-box.component";
import { CityComboBoxComponent } from "./ComboBoxComponent/city-combo-box/city-combo-box.component";
import { CountryComboBoxComponent } from "./ComboBoxComponent/country-combo-box/country-combo-box.component";
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DialogsModule  } from '@progress/kendo-angular-dialog';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { EducationComboBoxComponent } from './ComboBoxComponent/education-combo-box/education-combo-box.component';
import { StateComboBoxComponent } from './ComboBoxComponent/state-combo-box/state-combo-box.component';
import { ComboBoxesService } from '../services/combo-boxes.service';
import { CustomerTypeComponent } from './ComboBoxComponent/customer-type/customer-type.component';
import { AddressTypeComboBoxComponent } from './ComboBoxComponent/address-type-combo-box/address-type-combo-box.component';
import { BankAccoutTypeComponent } from './ComboBoxComponent/bank-accout-type/bank-accout-type.component';
import { IdentityManagementComponent } from './identity-management/identity-management.component';
import { IdentityComboBoxComponent } from './ComboBoxComponent/identity-combo-box/identity-combo-box.component';
import { IMaskModule } from 'angular-imask';
import { LegalTypeComboBoxComponent } from './ComboBoxComponent/legal-type-combo-box/legal-type-combo-box.component';
import { FreeZonesComboBoxComponent } from './ComboBoxComponent/free-zones-combo-box/free-zones-combo-box.component';
import { ZonesOfActivityComboBoxComponent } from './ComboBoxComponent/zones-of-activity-combo-box/zones-of-activity-combo-box.component';
import { PositionsComboBoxComponent } from './ComboBoxComponent/positions-combo-box/positions-combo-box.component';
import { DirectorateAuthoritiesComboBoxComponent } from './ComboBoxComponent/directorate-authorities-combo-box/directorate-authorities-combo-box.component';
import { MeasurementUnitsComboBoxComponent } from './ComboBoxComponent/measurement-units-combo-box/measurement-units-combo-box.component';
import { LegalBasicInformationComponent } from './legal-basic-information/legal-basic-information.component';
import { BankAccountDelegateComponent } from './bank-account-delegate/bank-account-delegate.component';
import { LegalPeopleWithVotingRightComponent } from './legal-people-with-voting-right/legal-people-with-voting-right.component';
import { StackeholdersInformationsComponent } from './stackeholders-informations/stackeholders-informations.component';
import { LegalFinancialDetailsComponent } from './legal-financial-details/legal-financial-details.component';
import { LegalProductionInformationsComponent } from './legal-production-informations/legal-production-informations.component';
import { OnlyPersianCharsDirective } from '../only-persian-chars.directive';
import { DisableControlDirective } from '../disable-control.directive';
import { SeriesLetterComboBoxComponent } from './ComboBoxComponent/series-letter-combo-box/series-letter-combo-box.component';
import { TimeLineComponent } from './time-line/time-line.component';
import { NbTooltipModule } from '@nebular/theme';
import { InteriorIndividualPrintComponent } from './interior-individual-print/interior-individual-print.component';
import { WindowComponent } from './window.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { SpecialZonesComboBoxComponent } from './ComboBoxComponent/special-zones-combo-box/special-zones-combo-box.component';
import { CurrencyComponent } from './ComboBoxComponent/currency/currency.component';
import { MartialsComponent } from './ComboBoxComponent/martials/martials.component';
import { ParticularsOfApplicantComponent } from './ForeignCustomers/Individual/particulars-of-applicant/particulars-of-applicant.component';
import { ContactInformationComponent } from './ForeignCustomers/contact-information/contact-information.component';
import { ApplicantEmploymentStatusComponent } from './ForeignCustomers/Individual/applicant-employment-status/applicant-employment-status.component';
import { ApplicantTradingIDsComponent } from './ForeignCustomers/applicant-trading-ids/applicant-trading-ids.component';
import { ApplicantFinancialInformationComponent } from './ForeignCustomers/Individual/applicant-financial-information/applicant-financial-information.component';
import { ApplicantBankAccountInformationComponent } from './ForeignCustomers/applicant-bank-account-information/applicant-bank-account-information.component';
import { AssociationComponent } from './ComboBoxComponent/assoassociation/assoassociation.component';
import { PartnershipsComponent } from './ComboBoxComponent/partnerships/partnerships.component';
import { AttorneyBasicInformationComponent } from './Attorney/attorney-basic-information/attorney-basic-information.component';
import { ClientOfAttorneyComponent } from './Attorney/client-of-attorney/client-of-attorney.component';
import { PowerOfAttorneyComponent } from './Attorney/power-of-attorney/power-of-attorney.component';
import { AuthorityLevelComponent } from './Attorney/authority-level/authority-level.component';
import { SlideInOutModule } from '../SlideInOutModule/slide-in-out.module';
import { CreateAttorneyRequestComponent } from './Attorney/create-attorney-request/create-attorney-request.component';
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DpDatePickerModule,
    GridModule,
    ExcelModule,  InputsModule, LayoutModule, DropDownsModule,
    DpDatePickerModule,
    DialogsModule,
    NotificationModule,
    IMaskModule,
    NbTooltipModule,
    IMEDatePickerModule,
    PDFExportModule,
    SlideInOutModule

  ],
  declarations: [
    PersonalDetailsComponent,
    PersonalWorkingDetailsComponent,
    PersonalFinancialDetailsComponent,
    BankDetailsComponent,
    AddressDetailsComponent,
    GenderComboBoxComponent,
    CityComboBoxComponent,
    CountryComboBoxComponent
    ,CommitmentDetailsComponent,
    BankComboBoxComponent,
    CountryComboBoxComponent,
    EducationComboBoxComponent,
    GenderComboBoxComponent,
    StateComboBoxComponent,
    CustomerTypeComponent,
    AddressTypeComboBoxComponent,
    BankAccoutTypeComponent,
    IdentityManagementComponent,
    IdentityComboBoxComponent,
    LegalTypeComboBoxComponent,
    FreeZonesComboBoxComponent,
    ZonesOfActivityComboBoxComponent,
    PositionsComboBoxComponent,
    DirectorateAuthoritiesComboBoxComponent,
    MeasurementUnitsComboBoxComponent,
    LegalBasicInformationComponent,
    BankAccountDelegateComponent,
    LegalPeopleWithVotingRightComponent,
    StackeholdersInformationsComponent,
    LegalFinancialDetailsComponent,
    LegalProductionInformationsComponent,
    OnlyPersianCharsDirective,
    DisableControlDirective,
    SeriesLetterComboBoxComponent,
    TimeLineComponent,
    InteriorIndividualPrintComponent,
    WindowComponent,
    SpecialZonesComboBoxComponent,
    CurrencyComponent,
    MartialsComponent,
    ParticularsOfApplicantComponent,
    ContactInformationComponent,
    ApplicantEmploymentStatusComponent,
    ApplicantTradingIDsComponent,
    ApplicantFinancialInformationComponent,
    ApplicantBankAccountInformationComponent,
    AssociationComponent,
    PartnershipsComponent,
    AttorneyBasicInformationComponent,
    ClientOfAttorneyComponent,
    PowerOfAttorneyComponent,
    AuthorityLevelComponent,
    CreateAttorneyRequestComponent
  ],
  exports: [
    PersonalDetailsComponent,
    PersonalWorkingDetailsComponent,
    PersonalFinancialDetailsComponent,
    BankDetailsComponent,
    AddressDetailsComponent,
    GenderComboBoxComponent,
    CityComboBoxComponent,
    CountryComboBoxComponent
    ,CommitmentDetailsComponent,
    BankComboBoxComponent,
    CountryComboBoxComponent,
    EducationComboBoxComponent,
    GenderComboBoxComponent,
    StateComboBoxComponent,
    CustomerTypeComponent,
    AddressTypeComboBoxComponent,
    BankAccoutTypeComponent,
    IdentityManagementComponent,
    IdentityComboBoxComponent,
    LegalTypeComboBoxComponent,
    FreeZonesComboBoxComponent,
    ZonesOfActivityComboBoxComponent,
    PositionsComboBoxComponent,
    DirectorateAuthoritiesComboBoxComponent,
    MeasurementUnitsComboBoxComponent,
    LegalBasicInformationComponent,
    BankAccountDelegateComponent,
    LegalPeopleWithVotingRightComponent,
    StackeholdersInformationsComponent,
    LegalFinancialDetailsComponent,
    TimeLineComponent,
    InteriorIndividualPrintComponent,
    LegalProductionInformationsComponent,
    WindowComponent,
    ParticularsOfApplicantComponent,
    ContactInformationComponent,
    ApplicantEmploymentStatusComponent,
    ApplicantTradingIDsComponent,
    ApplicantFinancialInformationComponent,
    ApplicantBankAccountInformationComponent,
    AssociationComponent,
    AttorneyBasicInformationComponent,
    CreateAttorneyRequestComponent
  ],
  providers:[
    ComboBoxesService,
  ]
})
export class ShareComponentModule {}
