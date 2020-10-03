import { HomeComponent } from './../CommonModule/home/home.component';
import { DocumentsManagementComponent } from './../CommonModule/documents-management/documents-management.component';
import { AllCustomerManagementComponent } from './all-customer-management/all-customer-management.component';
import { RequestsComponent } from './requestsManagement/requests/requests.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { HomeLayoutComponent } from '../CommonModule/home-layout/home-layout.component';
import { InteriorIndividualPrintComponent } from '../shareComponentModule/interior-individual-print/interior-individual-print.component';
import { AttorneyRequestsManagementComponent } from './attorney-requests-management/attorney-requests-management.component';
import { FinalAttorneyManagementComponent } from './final-attorney-management/final-attorney-management.component';


const routes: Routes = [


  {
    path: "",
    component: HomeLayoutComponent,
    children: [ {path: '', component:  HomeComponent},
    {path: 'request', component:  RequestsComponent},
    {path: 'attorneyRequests', component:  AttorneyRequestsManagementComponent},
    {path: 'finalAttorneys', component:  FinalAttorneyManagementComponent},
    {path: 'allCustomer', component:  AllCustomerManagementComponent},
    {path: 'documentsManagement/:id/:type/:name/:isViewMode/:market/:isBroker', component: DocumentsManagementComponent},
    {path: 'print', component:  InteriorIndividualPrintComponent},]
  }
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ]

})
export class BrokerRoutingModule {
}
