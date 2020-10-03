import { AuthService } from './shared/AuthService';
import { IMaskModule } from 'angular-imask'; 
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { HttpModule } from '@angular/http'; 
import { RTL } from "@progress/kendo-angular-l10n";

/** 
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { 
 
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbLayoutModule,
  
} from '@nebular/theme';
import { GlobalErrorHandlerService } from './global-error-handler.service';
 
import { CustomInterceptor } from './Services/customInterceptor';
import { StorageServiceModule} from 'angular-webstorage-service';
import { CookieService } from 'ngx-cookie-service';
import { AfterValueChangedDirective } from './after-value-changed.directive';
import { ExchangeModuleModule } from './exchange-module/exchange-module.module';
import { CommonsModule } from './CommonModule/commons.module';
import { SlideInOutModule } from './SlideInOutModule/slide-in-out.module';
import { ReactiveFormsModule, FormsModule, NG_VALIDATORS } from '@angular/forms';
import { FeatureService, SiteFeatureService, CategoryCreditService } from './services';
import { CategoryService } from './services/category.service';
import { SidebarService } from './SlideInOutModule/sidebar.service';
import { credit } from './Services/credit.service';
import { BrokerService } from './services/broker.service';
import { LoginServiceService } from './services/login-service.service';
import { BrokerRequestsService } from './Services/broker-requests.service';
import { CustomerCollectionService } from './services/customer-collection.service';
import { APP_BASE_HREF } from '@angular/common';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { ModalModule } from 'ngb-modal';
import {OAuthService, OAuthModule} from "angular-oauth2-oidc";
 
@NgModule({
  declarations: [AppComponent,
    AfterValueChangedDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ExcelModule,
    IMaskModule,
    ReactiveFormsModule,
    HttpModule,
    GridModule,
    InputsModule,
    LayoutModule,
    DropDownsModule,
    DpDatePickerModule,
    DialogsModule,
    NotificationModule,
    SlideInOutModule,
    ButtonsModule,
    CommonsModule,
    ExchangeModuleModule,


    HttpClientModule,
    StorageServiceModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot({preventDuplicates: true}),
    CoreModule.forRoot(),
    NbLayoutModule,
    PDFExportModule,
    ModalModule,


    OAuthModule.forRoot({
      resourceServer:{
        allowedUrls: ['https://customerapp.ime.co.ir' ],
        sendAccessToken:true,
      }
    }),

  ],
  providers:[
    OAuthService,
    AuthService,
    CookieService,
    FeatureService,
    SiteFeatureService,
    CategoryCreditService,
    CategoryService,
    SidebarService,
    credit,
    BrokerService,
    LoginServiceService,
    BrokerRequestsService,
    CustomerCollectionService,
    
    { provide: RTL, useValue: true },
    { provide: APP_BASE_HREF, useValue: "/" },
    //  { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: CustomInterceptor ,
    //   multi: true
    // }

    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor ,
      multi: true
    }, 
    CookieService ,
 
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent],
})
export class AppModule {
 
}
 