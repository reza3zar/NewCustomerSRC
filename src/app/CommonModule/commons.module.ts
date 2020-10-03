import { SlideInOutModule } from './../SlideInOutModule/slide-in-out.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankComboComponent } from './bank-combo/bank-combo.component';
import { BrokerComboComponent } from './broker-combo/broker-combo.component';
import { CustomerComboComponent } from './customer-combo/customer-combo.component';
import { CreditCategoryComboComponent } from './credit-category-combo/credit-category-combo.component';
import { ContentLoaderComponent } from './content-loader/content-loader.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { ExcelModule, GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { RouterModule } from '@angular/router';
import { RedirectToLogin } from './redirectToLogin.service';
import { SideNaveMenuComponent } from './side-nave-menu/side-nave-menu.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbSidebarModule, NbMenuModule, NbDialogModule, NbWindowModule, NbToastrModule, NbLayoutModule, NbIconModule, NbTooltipModule } from '@nebular/theme';
import { DocumentsManagementComponent } from './documents-management/documents-management.component';
import { BranchComponent } from './documents-management/branch/branch.component';
import { ModalModule } from 'ngb-modal';
import { SkeletonLoadingBarsComponent } from './skeleton-loading-bars/skeleton-loading-bars.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UnAuthorizedPageComponent } from './un-authorized-page/un-authorized-page.component';
import { RequestViewComponent } from './request-view/request-view.component';
import { ResponsesofRequestComponent } from './responsesof-request/responsesof-request.component';
import { ViewRequestComponent } from './view-request/view-request.component';
import { ShareComponentModule } from '../shareComponentModule/share-component.module';
import { HomeComponent } from './home/home.component';
import { ComboButtonComponent } from './combo-button/combo-button.component';
@NgModule({
  imports: [
    CommonModule,

    FormsModule,
    GridModule,
    ExcelModule,  InputsModule, LayoutModule, DropDownsModule,
    DpDatePickerModule,
    DialogsModule,
    NotificationModule,
    RouterModule,
    ThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbLayoutModule,
    ModalModule,
    NbIconModule,
    ReactiveFormsModule,
    NbTooltipModule,
    PdfViewerModule,
    ShareComponentModule,
    SlideInOutModule
  ],
  declarations: [
    NotFoundComponent,
    ContentLoaderComponent,
    CreditCategoryComboComponent,
    CustomerComboComponent,
    BrokerComboComponent,
    BankComboComponent,
    HomeLayoutComponent,
    SideNaveMenuComponent,
    DocumentsManagementComponent,
    BranchComponent,
    SkeletonLoadingBarsComponent,
    UnAuthorizedPageComponent,
    RequestViewComponent,
    ResponsesofRequestComponent,
    ViewRequestComponent,
    HomeComponent,
    ComboButtonComponent,


  ],
  exports:[
    NotFoundComponent,
    ContentLoaderComponent,
    CreditCategoryComboComponent,
    CustomerComboComponent,
    BrokerComboComponent,
    BankComboComponent,
 
    HomeLayoutComponent,
    UnAuthorizedPageComponent,
    RequestViewComponent,
    ResponsesofRequestComponent,
    ViewRequestComponent,
    HomeComponent,
    ComboButtonComponent,

  ],
  providers:[
    RedirectToLogin
  ]
})
export class CommonsModule { }
