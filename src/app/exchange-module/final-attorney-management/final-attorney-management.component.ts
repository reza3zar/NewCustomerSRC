import { Component, OnInit, ViewChild, OnDestroy, TemplateRef } from '@angular/core';
import { SortDescriptor, CompositeFilterDescriptor, orderBy, filterBy } from '@progress/kendo-data-query';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../SlideInOutModule/sidebar.service';
import { InActiveBackgroundService } from '../../in-active-background.service';
import { NotifyManagement } from '../../shared/NotifyManagement';
import { ModalManager } from 'ngb-modal';
import { Router } from '@angular/router';
import {   AttorneyRequestBrief } from '../../Models/Attorney/attorneyRequestBrief';
import { AttorneyServiceService } from '../../Services/attorney-service.service';
import { AttorneyRequest } from './../../Models/Attorney/AttorneyRequest';
import { modalConfigSettingMedium, modalConfigSettingLargeClosable } from '../../../modalConfig';
import * as FileSaver from 'file-saver';
import { OperationTypeEnum } from '../../Models/CustomersModels/Enums/OperationTypeEnum';
import { DocumentTypeEnum } from '../../Models/CustomersModels/Enums/MarketEnum';
import { DocumentService } from '../../Services/document.service';

@Component({
  selector: 'ngx-final-attorney-management',
  templateUrl: './final-attorney-management.component.html',
  styleUrls: ['./final-attorney-management.component.scss']
})
export class FinalAttorneyManagementComponent implements OnInit,OnDestroy {

  operationType: OperationTypeEnum;

public isViewMode=false;
public mymenuState: string = "out";
public mybg = "#fff";
public typeOpereation = "";
public gridData: GridDataResult;
public sort: SortDescriptor[] = [];
public loadingGrid = true;
public disableBtn = false;
public disableShowBtn = true;
public panelTypeEnum: string = "";
public pageSize = 14;
public skip = 0;
public state = false;
private dataRes = [];
public result;
public filter: CompositeFilterDescriptor;
public opened: boolean = false;

sidebarSubscriber: Subscription;
backGroundSubscriber: Subscription;
brokerRequestsSubscriber: Subscription;
mode='';
customerType='';

 

public selectedRequestItemResult: any = null;

constructor(    
  private sidebarService: SidebarService,
  private inActiveServ: InActiveBackgroundService,
  private notify: NotifyManagement,
  private attorneyService:AttorneyServiceService,
  private modalService: ModalManager,
  private documentService:DocumentService,) { }

ngOnInit() {
  this.loadingGrid=false;
  this.gridData = {
    data: this.dataRes,
    total: 0
  };

  this.sidebarSubscriber = this.sidebarService.change.subscribe(myState => {
    this.mymenuState = myState;
    if (myState === "out") {
       setTimeout(() => {
        this.typeOpereation = "none";
      }, 1000);
    }
  });

  this.backGroundSubscriber = this.inActiveServ.change.subscribe(myState => {
    this.state = myState;
  });
  this.refreshRequests();
  }

  refreshAllRequest(){
    this.refreshRequests();
  }

  refreshRequests(){
    this.loadingGrid = true;
    
    this.brokerRequestsSubscriber = this.attorneyService.getFinalAttorneysOfExchange().subscribe(result=>
      {
        console.log(result)
        this.dataRes = result.items as AttorneyRequestBrief[];
    
        
        this.gridData.data = this.dataRes;
        console.log(this.gridData.data)
        try {  
          this.gridData.total = this.dataRes.length;
        } catch (ex) {
          

        }
        this.loadItems();
        this.loadingGrid = false;
      },(error)=>{
        if((error)&& (error.status==500 || error.status==504))
        this.notify.showErrorMessageBox('متاسفانه خطای سروری رخ داده لطفا دوباره سعی کنید!');
         this.loadingGrid = false;
      })
  }



customerTypeEnum:CustomerTypeEnum=CustomerTypeEnum.UnKnown; 

public createNewRequest(): void {
  this.operationType=OperationTypeEnum.Add;
  this.isViewMode=false;
  this.selectedRequestItemResult=undefined;
  this.typeOpereation = "addNewRequest";
  this.mode="add";
  this.mymenuState = "in";
  setTimeout(() => {
    this.sidebarService.toggle(this.mymenuState);
  }, 100);

  this.inActiveServ.changeStatus(true);
  this.state = true;
}

checkIsSelectedRowForOperation(itemId: number){
  if (
   ! this.selectedRequestItemResult || !this.selectedRequestItemResult.dataItem
  )
    return true;
    if( this.selectedRequestItemResult.dataItem.id == itemId )
       return false;
  return true;
}

//TODO: change numbers with ENUMS
isClicked=false;
 


//TODO: Enum replace with numbers
checkIsSelectedRow(itemId: number,isOperational:boolean=true) {


if (
  this.selectedRequestItemResult == undefined ||
  this.selectedRequestItemResult == null ||  !this.selectedRequestItemResult.requestStatus || this.selectedRequestItemResult.requestStatus.id==3 || this.selectedRequestItemResult.requestStatus.id==9 || this.selectedRequestItemResult.requestStatus.id==8  || this.selectedRequestItemResult.requestStatus.id==6 || this.selectedRequestItemResult.requestStatus.id==7 || this.selectedRequestItemResult.requestStatus.id==5
)
  return true;




  if(!isOperational && this.selectedRequestItemResult.requestStatus.id!=3 && this.selectedRequestItemResult.id == itemId )
  return false;

//   console.log(this.selectedRequestItemResult.id == itemId)

if (this.selectedRequestItemResult.id == itemId){
  if(this.selectedRequestItemResult.requestStatus.id==2 || this.selectedRequestItemResult.requestStatus.id==4 )
   {
    return false;
   }
}

if (this.selectedRequestItemResult.id == itemId){
    if(this.selectedRequestItemResult.requestStatus.id==4)
      return true;
  return false;
}
return true;
}

public pageChange(event: PageChangeEvent): void {
this.skip = event.skip;
this.loadItems();
}

private loadItems(): void {
var resultSort = this.dataRes.slice(this.skip, this.skip + this.pageSize);
this.gridData = {
  data: resultSort,
  total: this.dataRes.length
};
}

public filterChange(filter: CompositeFilterDescriptor): void {
this.filter = filter;
this.loadAllItems();
} 

public selected(e) {
let selectedCredit : any={};
this.disableShowBtn = false;
this.isClicked=false;

this.selectedRequestItemResult = e.selectedRows[0]

}
public sortChange(sort: SortDescriptor[]): void {
this.sort = sort;
this.loadAllItems();
}
private loadAllItems(): void {
var resultSort = orderBy(this.dataRes, this.sort);
var resultFilter = filterBy(resultSort, this.filter);
this.gridData = {
  data: resultFilter,
  total: resultFilter.length
};
}
public onCellClick(e: any): void {
// if (e.type === "contextmenu") {
//   const originalEvent = e.originalEvent;
//   originalEvent.preventDefault();
// }
}

@ViewChild('deleteModal',{static:true}) deleteModal;
private modalRef;
private modalMed = modalConfigSettingMedium;
private modalMedCloseAble = modalConfigSettingLargeClosable;
 

closeModal(){
this.modalService.close(this.modalRef);
}

ngOnDestroy(): void {
if (this.sidebarSubscriber !== undefined) {
  this.sidebarSubscriber.unsubscribe();
}


if (this.brokerRequestsSubscriber !== undefined) {
  this.brokerRequestsSubscriber.unsubscribe();
}

if (this.backGroundSubscriber !== undefined) {
  this.backGroundSubscriber.unsubscribe();
}

if (this.requestsDeleteRequestSubscriber !== undefined) {
  this.requestsDeleteRequestSubscriber.unsubscribe();
}

if (this.getAttorneyRequestByRequestIdSubscriber !== undefined) {
  this.getAttorneyRequestByRequestIdSubscriber.unsubscribe();
}


}

 
public updateRequestInDataCollectionOfGrid(result: any) {

//TODO: remove refreshAllRequest() only refresh one record
this.refreshAllRequest();

return;

let updateitem = this.gridData.data.find(x => x.id == this.selectedRequestItemResult.id);

if (updateitem !== undefined) {
  updateitem.id=result.id;
  if(updateitem.requestStatus){
    updateitem.requestStatus.id = result.requestStatus.id;
    updateitem.requestStatus.name = result.requestStatus.name;
    updateitem.requestStatus.value = result.requestStatus.value;
  }

    if(result.responseType){
      updateitem.responseType.id = result.responseType.id;
      updateitem.responseType.name = result.responseType.name;
      updateitem.responseType.value = result.responseType.value;
    }
  updateitem.requestSendDateTime = result.requestSendDateTime;
  updateitem.responseCreateDateTime = '';
  updateitem.responseSendDateTime = '';
}

console.error(updateitem);


}

openConfirmDeleteModal(){
this.modalRef = this.modalService.open(this.deleteModal,this.modalMed)
}

requestsDeleteRequestSubscriber: Subscription;
deleteSelectedRequest(){
  this.requestsDeleteRequestSubscriber=  this.attorneyService.deleteAttorneyRequest(this.selectedRequestItemResult.id.toString()).subscribe(result =>{
      this.closeModal();
      //TODO: change refresh to one record instead of all records
        this.refreshRequests();
      },error=>{
        console.log(error);
        this.closeModal();
        if(error==undefined ||error.error==undefined || error.error.errors==undefined )
          return;
  
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

watingForGetPdf=false;
getKeyOfIndividualInteriorForExporSubscriber: Subscription;
getPdfOfRequestByKeySubscriber: Subscription;
exportPdf(){
  this.watingForGetPdf=true;
  let fileNamePrint=this.selectedRequestItemResult.attorneyName+' ('+this.selectedRequestItemResult.attorneyExternalId+' )'+ '.pdf';

  this.getKeyOfIndividualInteriorForExporSubscriber= this.attorneyService.getKeyOfAttorneyRequestForExportPdf(this.selectedRequestItemResult.id).subscribe(result =>{

          
         this.getPdfOfRequestByKeySubscriber=   this.attorneyService.getPdfOfRequestByKey(result).subscribe(resultPdf =>{
            //this.brokerRequests.getPdfOfIndividualAuthoritySignatureForm(result).subscribe(resultPdf =>{
            this.watingForGetPdf=false;
            let fileName=fileNamePrint;
            if(this.selectedRequestItemResult!==null && this.selectedRequestItemResult!==undefined && this.selectedRequestItemResult.externalId!==null
               && this.selectedRequestItemResult.externalId!==undefined && this.selectedRequestItemResult.name!==null && this.selectedRequestItemResult.name!==undefined)
                {
                  fileName=this.selectedRequestItemResult.name + '( '+this.selectedRequestItemResult.externalId+' ).pdf'
                }
                FileSaver.saveAs(resultPdf, fileName);

        },err=>{
                this.watingForGetPdf=false;
                this.notify.showErrorMessageBoxWithDuplicate("خطا در دریافت فایل پرینت!");

        })
       },error=>{
                this.notify.showErrorMessageBoxWithDuplicate("خطا در دریافت کلید فایل پرینت!");
                this.watingForGetPdf=false;

           }) 
}
editInProgress=false; 
viewInProgress=false; 
requestObj:any;
getAttorneyRequestByRequestIdSubscriber: Subscription;
attorneyRequest:AttorneyRequest;

showRequestDetails(requestId){
  this.operationType=OperationTypeEnum.View;

   this.viewInProgress=true;
    this.isViewMode=true;
    this.getSelectedAttorneyRequest("viewRequest");

}

editRequest(){
  this.operationType=OperationTypeEnum.Edit;

  this.editInProgress=true;
  this.isViewMode=false;
  this.getSelectedAttorneyRequest("editRequest");
}


getSelectedAttorneyRequest(typeOpereation){
  this.getAttorneyRequestByRequestIdSubscriber= this.attorneyService.getAttorneyByIdExchangeSide(this.selectedRequestItemResult.dataItem.id).subscribe(result=>
    {
      this.requestObj=result;
      this.attorneyRequest=result;
      this.typeOpereation =typeOpereation ;
    
      console.log(this.requestObj);
      this.viewInProgress=false;
      this.editInProgress=false;
     
      this.mymenuState = "in";
      setTimeout(() => {
        this.sidebarService.toggle(this.mymenuState);
      }, 100);
    
      this.inActiveServ.changeStatus(true);
      this.state = true;
    
    
    },error=>{
      console.log(error);
      this.viewInProgress=false;
      this.editInProgress=false;
    
          if(error && error.status==401){
            this.notify.showErrorMessageBox('اعتبار دسترسی شما به سامانه پاین یافته و نیاز به ورود مجدد می باشید');
            return;
          }
    
          if(error && error.status==500){
            this.notify.showErrorMessageBox('خطای سروری 500');
            return;
          }
    
          if(error==undefined ||error.error==undefined || error.error.errors==undefined )
          return;
    
    
    
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

@ViewChild('contentTemplate', { static: false }) contentTemplate: TemplateRef<any>;
showDescription() {
  this.modalRef = this.modalService.open(this.contentTemplate,this.modalMedCloseAble)
}

 
isDownloading=false;

downloadDocumentsSubscriber: Subscription;
downloadAllDocumentsSubscriber: Subscription;
 
downloadDocuments(){
  this.isDownloading=true;
  if(!this.selectedRequestItemResult)
    return;

    this.downloadDocumentsSubscriber= this.documentService.getStatusOfFinalEvidenceExchangeSide(this.selectedRequestItemResult.dataItem.id,CustomerTypeEnum.UnKnown,DocumentTypeEnum.Attorney).subscribe(result=>{

    if (result ==undefined){
      this.notify.showErrorMessageBox("هیچ مدرکی برای درخواست انتخاب شده یافت نشد!");
      this.isDownloading=false;

      return;
    }

    let arrayKeys=[];

    result.forEach(element => {
      if(element.uri!=="")
        arrayKeys.push(element.uri);
    });

    if (arrayKeys ==[]|| arrayKeys.length==0){
      this.notify.showErrorMessageBox("هیچ مدرکی برای درخواست انتخاب شده یافت نشد!");
      this.isDownloading=false;

      return;
    }

    this.downloadAllDocuments(arrayKeys);
    

  },error=>{
    console.log(error);
    this.isDownloading=false;
    if(error==undefined ||error.error==undefined || error.error.errors==undefined )
      return;

    for (let errItemValue of Object.entries(error.error.errors)) {
      let val=errItemValue[1];
      if(errItemValue[1]!=undefined && errItemValue[1]!=null)
      {
        for (let errorMessageItem of Object.entries(val)){
          this.notify.showErrorMessageBoxWithDuplicate(errorMessageItem[1])
        }
      }
  }
      
  });
}

 
downloadAllDocuments(arrayKeys){
  this.downloadAllDocumentsSubscriber= this.documentService.downloadAllDocuments(arrayKeys).subscribe(result=>{
    FileSaver.saveAs(result, 'downloadDocument.zip');
    this.isDownloading=false;
  },error=>{
    console.log(error);
    this.isDownloading=false;
    if(error==undefined ||error.error==undefined || error.error.errors==undefined )
      return;

    for (let errItemValue of Object.entries(error.error.errors)) {
      let val=errItemValue[1];
      if(errItemValue[1]!=undefined && errItemValue[1]!=null)
      {
        for (let errorMessageItem of Object.entries(val)){
          this.notify.showErrorMessageBoxWithDuplicate(errorMessageItem[1])
        }
      }
  }
      
  });
}

}
