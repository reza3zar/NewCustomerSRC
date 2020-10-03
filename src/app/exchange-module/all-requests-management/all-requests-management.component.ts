import { messages } from './../../pages/extra-components/chat/messages';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, Inject } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, filterBy, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Subscription } from 'rxjs';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { NbDialogService, NbWindowService, NbWindowState, NbWindowRef } from '@nebular/theme';
import { SidebarService } from '../../SlideInOutModule/sidebar.service';
import { InActiveBackgroundService } from '../../in-active-background.service';
import { ExchangeRequestsService } from '../../Services/exchange-requests.service';
import { brokerRequest } from '../../Models/CustomersModels/Common/brokerRequest';
import { TimeLineModel } from '../../Models/System/timeLineModel';
import { NotifyManagement } from '../../shared/NotifyManagement';
import { ModalManager } from 'ngb-modal';
import { modalConfigSettingMedium, modalConfigSettingLarge, modalConfigSettingLargeClosable } from '../../../modalConfig';
import { DocumentService } from '../../Services/document.service';
import * as FileSaver from 'file-saver';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {   DocumentTypeEnum } from '../../Models/CustomersModels/Enums/MarketEnum';
import { ComboButtonItem } from '../../Models/Misc/ComboButtonItem';
import { ComboItem } from '../../Models/System/comboItem';
 

@Component({
  selector: 'app-all-requests-management',
  templateUrl: './all-requests-management.component.html',
  styleUrls: ['./all-requests-management.component.css']
})

export class AllRequestsManagementComponent implements OnInit,OnDestroy {
  public mymenuState: string = "out";
  public mybg = "#fff";
  public typeOpereation = "";
  faCoffee = faCoffee;
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
  public statusOfRequest:any=null;

  sidebarSubscriber: Subscription;
  backGroundSubscriber: Subscription;
  requestServiceSubscriber: Subscription;
  acceptRequestServiceSubscriber: Subscription;
  rejectRequestServiceSubscriber: Subscription;
  historyRequestServiceSubscriber: Subscription;


  customerType='';
  historyInProgress=false;
  public selectedRequestItemResult: brokerRequest = null;

  constructor(
    private formBuilder: FormBuilder,
    private requests:ExchangeRequestsService,
    private sidebarService: SidebarService,
    private inActiveServ: InActiveBackgroundService,
    private notify: NotifyManagement,
    private modalService: ModalManager,
    private documentService:DocumentService,
    private router:Router,
     ) {
       
     }

  ngOnInit() {
 

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
    this.index=0;
    this.increaseRefreshTimer();
 
    }

    refreshAllRequest(){
      this.refreshRequests();
      this.value=this.index=0;

    }
    requestForm:FormGroup;

    refreshRequests(){
      this.loadingGrid = true;

      this.requestServiceSubscriber = this.requests.getRequestsOfBrokers().subscribe(result=>
        {
          this.dataRes = result.items as brokerRequest[];
          this.gridData.data = this.dataRes;
          try {
            this.gridData.total = this.dataRes.length;
          } catch (ex) {
            console.error(ex);
          }
          this.loadItems();
  
          this.loadingGrid = false;
        },error=>{
          this.loadingGrid = false;
          console.log(error);
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
        })
    }
 

  ngOnDestroy(): void {
    if (this.sidebarSubscriber !== undefined) {
      this.sidebarSubscriber.unsubscribe();
    }

    if (this.backGroundSubscriber !== undefined) {
      this.backGroundSubscriber.unsubscribe();
    }

    if (this.requestServiceSubscriber !== undefined) {
      this.requestServiceSubscriber.unsubscribe();
    }

    if (this.rejectRequestServiceSubscriber !== undefined) {
      this.rejectRequestServiceSubscriber.unsubscribe();
    }

    if (this.acceptRequestServiceSubscriber !== undefined) {
      this.acceptRequestServiceSubscriber.unsubscribe();
    }

    if (this.downloadDocumentsSubscriber !== undefined) {
      this.downloadDocumentsSubscriber.unsubscribe();
    }

    if (this.downloadAllDocumentsSubscriber !== undefined) {
      this.downloadAllDocumentsSubscriber.unsubscribe();
    }

    
    if (this.updateResponseStatusSubscriber !== undefined) {
      this.updateResponseStatusSubscriber.unsubscribe();
    }
    if (this.getBrokerRequestInfoSubscriber !== undefined) {
      this.getBrokerRequestInfoSubscriber.unsubscribe();
    }
    
  }

  public sendRequestShowDialog() {
    if (
      this.selectedRequestItemResult == null ||
      this.selectedRequestItemResult === undefined
    )
      return;
    this.opened = true;
  }

  public close(status) {

  }

  public allData(): ExcelExportData {
    var res = this.dataRes;
    const result: ExcelExportData = {
      data: res
    };

    return result;
  }


  requestObj:any;
  customerTypeEnum:CustomerTypeEnum=CustomerTypeEnum.UnKnown; 
  editInProgress=false; 
  mode='';
  getBrokerRequestInfoSubscriber: Subscription;

  showDetails() {
    this.disableShowBtn = true;
    this.panelTypeEnum = "showMode";
    this.typeOpereation = "showDetail";
    this.mymenuState = "in";
    setTimeout(() => {
      this.sidebarService.toggle(this.mymenuState);
    }, 100);

    this.inActiveServ.changeStatus(true);
    this.state = true;
  }

  viewRequestInProgress=false;
  showRequestDetails(requestId){
    

  if(this.selectedRequestItemResult.customerType.id==CustomerTypeEnum.individualInterior)
    this.customerTypeEnum=CustomerTypeEnum.individualInterior;

  if(this.selectedRequestItemResult.customerType.id==CustomerTypeEnum.public)
    this.customerTypeEnum=CustomerTypeEnum.public;

  if(this.selectedRequestItemResult.customerType.id==CustomerTypeEnum.legalInterior)
    this.customerTypeEnum=CustomerTypeEnum.legalInterior;
     this.viewRequestInProgress=true;

     this.getBrokerRequestInfoSubscriber=this.requests.getBrokerRequestInfo(this.selectedRequestItemResult.id,true,this.selectedRequestItemResult.customerType.id,
  this.selectedRequestItemResult.requestType.id).subscribe(result=>
{
  this.requestObj=result;
  this.viewRequestInProgress=false;
  this.editInProgress=false;

  this.typeOpereation = "showDetail";
  this.mymenuState = "in";
  setTimeout(() => {
    this.sidebarService.toggle(this.mymenuState);
  }, 100);

  this.inActiveServ.changeStatus(true);
  this.state = true;


},error=>{
  console.log(error);
  this.viewRequestInProgress=false;

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




    goToDocumentsManagement(id,data){
 
      let market:DocumentTypeEnum;
      if(this.selectedRequestItemResult.derivativesMarket && this.selectedRequestItemResult.spotMarket)
        market=DocumentTypeEnum.SpotMarketAndDerivativesMarket;
      else if(this.selectedRequestItemResult.derivativesMarket)
        market=DocumentTypeEnum.SpotMarketAndDerivativesMarket;
      else if(this.selectedRequestItemResult.spotMarket)
        market=DocumentTypeEnum.SpotMarket;
      
    this.router.navigate(['exchange/documentsManagement/',id,data.customerType.id,data.name,true,market,0]);
  
     }



  // public createNewRequest(): void {
  //   this.typeOpereation = "addNewRequest";
  //   this.mymenuState = "in";
  //   setTimeout(() => {
  //     this.sidebarService.toggle(this.mymenuState);
  //   }, 100);

  //   this.inActiveServ.changeStatus(true);
  //   this.state = true;
  // }


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
    let selectedCredit = new brokerRequest();
    this.disableShowBtn = false;
    this.selectedRequestItemResult = e.selectedRows[0]
      ? (e.selectedRows[0].dataItem as brokerRequest)
      : new brokerRequest();

   
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
    if (e.type === "contextmenu") {
      const originalEvent = e.originalEvent;
      originalEvent.preventDefault();
    }
  }
 

  checkIsSelectedRow(itemId: number) {
    if (
      this.selectedRequestItemResult == undefined ||
      this.selectedRequestItemResult == null
    )
      return true;


    if (this.selectedRequestItemResult.id == itemId){
          return false;
    }
    return true;
  }
  SaveRequestsFake(request):void{

    console.log(request)
    this.sidebarService.toggle('out');
    this.loadingGrid = true;
    this.refreshRequests();
  }

  SetCustomerType(customerType):void{
    this.customerType=customerType;
    console.log(customerType);
  }


  updateRequests(request:any){
    this.gridData.data.push(request);
  }

  sendRequestToServer(){
    // this.checkIsSelectedRow(this.selectedRequestItemResult.id);
    // this.brokerRequests.sendDraftRequestToServer(this.selectedRequestItemResult.id,this.selectedRequestItemResult.requestType.id,
    //   true,this.selectedRequestItemResult.customerType.id).subscribe(result =>{
    //       console.log(this.result);
    //       this.refreshRequests();
    // })
  }

  deleteSelectedRequest(){
 
    // this.brokerRequests.deleteDraftRequest(this.selectedRequestItemResult.id,this.selectedRequestItemResult.requestType.id,
    //   true,this.selectedRequestItemResult.customerType.id).subscribe(result =>{
    //       this.refreshRequests();
    // }) 
  }

  value = 0;
  get status() {
    if (this.value <= 25) {
      return 'danger';
    } else if (this.value <= 50) {
      return 'warning';
    } else if (this.value <= 75) {
      return 'info';
    } else {
      return 'success';
    }
  }
  index=1;
  async increaseRefreshTimer( ){
    while (this.index<101) {
      await this.delay(6000);
      this.index++;
      this.value=this.index;
      if(this.index==100){
        this.refreshRequests();
        this.index=1;
      }
    }
    }

    // for (let index = 1; index <= 100; index++) {
    //   await this.delay(6000);
    //   this.value=index;
    //   if(index==100){
    //     this.refreshRequests();
    //     index=1;
    //   }
    // }
  // }
    delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  @ViewChild('contentTemplate', { static: false }) contentTemplate: TemplateRef<any>;
  showDescription() {
    // this.windowService.open(
    //   this.contentTemplate,
    //   { title: 'توضیحات درخواست', context: { text: this.selectedRequestItemResult.responseDescription } },
    // );
  }
  @ViewChild('contentTemplateResponsebrokerRequest', { static: false }) contentTemplateResponsebrokerRequest: TemplateRef<any>;


  statusOfResponseIsReject=true;
  ModalTitleBaseOnOperation='';
  modalVal:any;
  responseRequest(statusOfResponseIsReject:boolean){
    if(this.selectedRequestItemResult==undefined || this.selectedRequestItemResult==null)
    return;

  this.statusOfResponseIsReject=statusOfResponseIsReject;
    if(this.statusOfResponseIsReject)
      this.ModalTitleBaseOnOperation='رد درخواست برای : '
    else
      this.ModalTitleBaseOnOperation='تایید اولیه درخواست برای : '


      this.modalRef = this.modalService.open(this.contentTemplateResponsebrokerRequest,this.modalLarge)

  }

  deleteRequestFromDataGridCollection(updateitem){
    const index = this.gridData.data.indexOf(updateitem, 0);
    if (index > -1) {
      this.gridData.data.splice(index, 1);
    }
  }

  private updateRequestInDataCollectionOfGrid(result: any) {
    let updateitem = this.gridData.data.find(x => x.id == result.id);
    if (updateitem !== undefined) {
      this.deleteRequestFromDataGridCollection(updateitem)
    }
 
  }

 
  sendDataToServer:boolean=false;
  description:string='';
  descriptionUpdateResponseStatus:string='';
  acceptSelectedRequest(){
    this.sendDataToServer=true;
    this.acceptRequestServiceSubscriber= this.requests.acceptRequestByReqId(this.selectedRequestItemResult.id,this.description).subscribe(result=>{
      this.sendDataToServer=false;
      // this.refreshAllRequest();
      this.closeAllModal();
      this.description="";
      this.updateRequestInDataCollectionOfGrid(result);

    },error=>{
      this.sendDataToServer=false;
    })
  }

  rejectSelectedRequest(){
    this.sendDataToServer=true;
   this.rejectRequestServiceSubscriber= this.requests.rejectRequestByReqId(this.selectedRequestItemResult.id,this.description).subscribe(result=>{
      this.sendDataToServer=false;
      // this.refreshAllRequest();
      this.closeAllModal();
      this.description="";
      this.updateRequestInDataCollectionOfGrid(result);
    },error=>{
      this.sendDataToServer=false;
    })
  }

  // @ViewChild('contentHistoryOfRejectDescriptions', { static: false }) contentHistoryOfRejectDescriptions: TemplateRef<any>;
  @ViewChild('contentHistoryOfRejectDescriptions', { static: true }) contentHistoryOfRejectDescriptions ;
  @ViewChild('commonResponses', { static: true }) commonResponses ;


  timeLineCollection:Array<TimeLineModel>;
  showTimeLineHistory(){

    if (this.selectedRequestItemResult==undefined || this.selectedRequestItemResult==null)
      return;
      this.historyInProgress=true;
   this.historyRequestServiceSubscriber= this.requests.getHistoryOfrejectRequestByRequestId(this.selectedRequestItemResult.id).subscribe(result=>{
      this.timeLineCollection=result.items;
      if(this.timeLineCollection==undefined ||this.timeLineCollection==null || this.timeLineCollection.length==0)
      {
        this.notify.showErrorMessageBoxWithDuplicate('تاریخچه رد درخواست یافت نشد!');
        this.historyInProgress=false;
        return;
      }
      this.historyInProgress=false;

      this.modalRef = this.modalService.open(this.contentHistoryOfRejectDescriptions,this.modallargeClosable)
    },error=>{
      this.historyInProgress=false;
      console.error(error);
      
      this.notify.showErrorMessageBoxWithDuplicate('تاریخچه رد درخواست یافت نشد!' )
    });


  }
  private modalLarge = modalConfigSettingLarge;
  private modalMed = modalConfigSettingMedium;
  private modallargeClosable = modalConfigSettingLargeClosable;

  openConfirmDeleteModal(){
}
 
private modalRef;

closeAllModal(){
    this.modalService.close(this.modalRef);
}
isDownloading=false;

downloadDocumentsSubscriber: Subscription;
downloadAllDocumentsSubscriber: Subscription;
 

downloadDocuments(){
  this.isDownloading=true;
  if(this.selectedRequestItemResult==undefined || this.selectedRequestItemResult.customerType==undefined)
    return;

    this.downloadDocumentsSubscriber= this.documentService.getStatusOfEvidence(this.selectedRequestItemResult.id,this.selectedRequestItemResult.customerType.id,DocumentTypeEnum.UnKnown,0).subscribe(result=>{

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

    updateResponseStatusSubscriber: Subscription;
    changeOfResponseStatus(){
      this.modalRef = this.modalService.open(this.commonResponses,this.modalMed)
    }
    sendNewStateOfRequest(){
      
      if(this.statusOfRequest==null){
        this.notify.showErrorMessageBoxWithDuplicate("شرح پاسخ به درستی انتخاب نشده است!")
        return;
      }

      if (this.selectedRequestItemResult==undefined || this.selectedRequestItemResult==null)
      return;
      this.sendDataToServer=true;
   this.updateResponseStatusSubscriber= this.requests.updateResponseStatusByClerk(this.selectedRequestItemResult.id,this.statusOfRequest.id,this.descriptionUpdateResponseStatus)
                                        .subscribe(result=>{
      this.closeAllModal();
      this.sendDataToServer=false;

    },error=>{
      console.error(error);
      this.sendDataToServer=false;

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

    responseComboValueChange(value){
      if(value && value.name)
        this.descriptionUpdateResponseStatus=value.name;
    }



  
}
