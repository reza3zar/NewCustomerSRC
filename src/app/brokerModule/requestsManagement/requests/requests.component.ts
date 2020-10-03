import { modalConfigSettingMedium, modalConfigSettingMediumClosable, modalConfigSettingLargeClosable } from '../../../../modalConfig';
import { brokerRequest } from './../../../Models/CustomersModels/Common/brokerRequest';
import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, filterBy, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { SidebarService } from '../../../SlideInOutModule/sidebar.service';
import { InActiveBackgroundService } from '../../../in-active-background.service';
import { Subscription } from 'rxjs';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { BrokerRequestsService } from '../../../services/broker-requests.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { NotifyManagement } from '../../../shared/NotifyManagement';
import { ModalManager, ModalConfig } from 'ngb-modal';

import * as $ from 'jquery';

import * as FileSaver from 'file-saver';
import { Router } from '@angular/router';
import { assignRequestResult } from '../../../Models/Misc/assignRequestResult';
import { ComboButtonItem } from '../../../Models/Misc/ComboButtonItem';
import { ComboItem } from '../../../Models/System/comboItem';
import { PrintModeEnum } from '../../../Models/CustomersModels/Enums/PrintModeEnum';
import { DocumentTypeEnum } from '../../../Models/CustomersModels/Enums/MarketEnum';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
 
})

///api/Reports/IndividualAuthoritySignatureForm/PrintPdf
export class RequestsComponent implements OnInit, OnDestroy,  AfterViewInit {
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

  sidebarSubscriber: Subscription;
  backGroundSubscriber: Subscription;
  brokerRequestsSubscriber: Subscription;

  customerType='';

   

  public selectedRequestItemResult: brokerRequest = null;
  
  @ViewChild('assignModal',{static:true}) assignModal;

  @ViewChild('deleteModal',{static:true}) deleteModal;
  @ViewChild('sendModal',{static:true}) sendModal;
  private modalRef;
  

  constructor(
    private brokerRequests:BrokerRequestsService,
    private sidebarService: SidebarService,
    private inActiveServ: InActiveBackgroundService,
    private notify: NotifyManagement,
    private modalService: ModalManager,
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
    }

    refreshAllRequest(){
      this.refreshRequests();
    }

    refreshRequests(){
      this.loadingGrid = true;
      
      this.brokerRequestsSubscriber = this.brokerRequests.getBrokerRequests().subscribe(result=>
        {
          this.dataRes = result.items as brokerRequest[];
      
          
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


    brokerRequestsSendRequestSubscriber: Subscription;
    brokerRequestsDeleteRequestSubscriber: Subscription;

  ngOnDestroy(): void {
    if (this.sidebarSubscriber !== undefined) {
      this.sidebarSubscriber.unsubscribe();
    }

    if (this.backGroundSubscriber !== undefined) {
      this.backGroundSubscriber.unsubscribe();
    }

    if (this.brokerRequestsSubscriber !== undefined) {
      this.brokerRequestsSubscriber.unsubscribe();
    }
    if (this.brokerRequestsSendRequestSubscriber !== undefined) {
      this.brokerRequestsSendRequestSubscriber.unsubscribe();
    }
    if (this.brokerRequestsDeleteRequestSubscriber !== undefined) {
      this.brokerRequestsDeleteRequestSubscriber.unsubscribe();
    }

    if(this.brokerAssignRequestsSendRequestSubscriber)
      this.brokerAssignRequestsSendRequestSubscriber.unsubscribe();

    if(this.brokerRemoveRequestsSendRequestSubscriber)
      this.brokerRemoveRequestsSendRequestSubscriber.unsubscribe();

      if (this.getBrokerRequestInfo !== undefined) {
        this.getBrokerRequestInfo.unsubscribe();
      }
      if (this.getKeyOfIndividualInteriorForExporSubscriber !== undefined) {
        this.getKeyOfIndividualInteriorForExporSubscriber.unsubscribe();
      }
      if (this.getPdfOfRequestByKeySubscriber !== undefined) {
        this.getPdfOfRequestByKeySubscriber.unsubscribe();
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
 

  public createNewRequest(): void {
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
    this.isClicked=false;

    this.selectedRequestItemResult = e.selectedRows[0]
      ? (e.selectedRows[0].dataItem as brokerRequest)
      : new brokerRequest(); 

      if( this.selectedRequestItemResult.customerType.id== CustomerTypeEnum.individualInterior)
      {
        this.printMode=PrintModeEnum.SampleSignatureIndividualForm;
        this.fillListComboButtonCollection(CustomerTypeEnum.individualInterior);
      }


      if( this.selectedRequestItemResult.customerType.id== CustomerTypeEnum.legalInterior){
        this.fillListComboButtonCollection(CustomerTypeEnum.legalInterior);
        this.printMode=PrintModeEnum.SignedRightHolders;

      }

      if( this.selectedRequestItemResult.customerType.id== CustomerTypeEnum.public){
        this.fillListComboButtonCollection(CustomerTypeEnum.public);
        this.printMode=PrintModeEnum.SignedRightHolders;

      }

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
//TODO: change numbers with ENUMS
    isClicked=false;
  checkIsSelectedRowForOperationUploadDocuments(itemId: number){


    if (
      this.selectedRequestItemResult == undefined || 
      this.selectedRequestItemResult == null || this.selectedRequestItemResult.requestStatus.id==3  || this.selectedRequestItemResult.requestStatus.id==5 
    )
      return true;



    if (this.selectedRequestItemResult.id == itemId){
      if(this.selectedRequestItemResult.requestStatus.id==6 || this.selectedRequestItemResult.requestStatus.id==8 || this.selectedRequestItemResult.requestStatus.id==2  || this.selectedRequestItemResult.requestStatus.id==4)
       {
        return false;
       }
       return true;
    }
    return true;
  }
 
//TODO: Enum replace with numbers
  checkIsSelectedRow(itemId: number,isOperational:boolean=true) {


    if (
      this.selectedRequestItemResult == undefined ||
      this.selectedRequestItemResult == null || this.selectedRequestItemResult.requestStatus.id==3 || this.selectedRequestItemResult.requestStatus.id==9 || this.selectedRequestItemResult.requestStatus.id==8  || this.selectedRequestItemResult.requestStatus.id==6 || this.selectedRequestItemResult.requestStatus.id==7 || this.selectedRequestItemResult.requestStatus.id==5
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


  checkIsSelectedRowForOperation(itemId: number){
    if (
      this.selectedRequestItemResult == undefined ||
      this.selectedRequestItemResult == null
    )
      return true;
      if( this.selectedRequestItemResult.id == itemId )
         return false;

    

    return true;
  }


 


 
// TODO: Category Iran & Foreign People, I set all of them True!
getBrokerRequestInfo: Subscription;



  requestObj:any;
  customerTypeEnum:CustomerTypeEnum=CustomerTypeEnum.UnKnown; 
  editInProgress=false; 
  viewInProgress=false; 

  mode='';
  editRequest(){
    if(this.selectedRequestItemResult==null || this.selectedRequestItemResult==undefined || this.selectedRequestItemResult.customerType ==undefined
      || this.selectedRequestItemResult.customerType==null)
      {
        this.notify.showErrorMessageBoxWithDuplicate("فرمت اطلاعات درخواست صحیح نمی باشد!")
        return;
      }

      this.editInProgress=true;

      if(this.selectedRequestItemResult.customerType.id==CustomerTypeEnum.individualInterior)
          this.customerTypeEnum=CustomerTypeEnum.individualInterior;

      if(this.selectedRequestItemResult.customerType.id==CustomerTypeEnum.legalInterior)
          this.customerTypeEnum=CustomerTypeEnum.legalInterior;

          if(this.selectedRequestItemResult.customerType.id==CustomerTypeEnum.public)
          this.customerTypeEnum=CustomerTypeEnum.public;

     this.getBrokerRequestInfo= this.brokerRequests.getBrokerRequestInfo(this.selectedRequestItemResult.id,true,this.selectedRequestItemResult.customerType.id,
        this.selectedRequestItemResult.requestType.id).subscribe(result=>
      {
        if(!result){
          this.notify.showErrorMessageBoxWithDuplicate("درخواستی برای ویرایش یافت نشد!");
          this.editInProgress=false;
          return;
        }
        this.requestObj=result;
        console.log(this.requestObj);
        
      this.editInProgress=false;

        this.typeOpereation = "editRequest";
        this.mode="edit";
        this.mymenuState = "in";
        setTimeout(() => {
          this.sidebarService.toggle(this.mymenuState);
        }, 100);
    
        this.inActiveServ.changeStatus(true);
        this.state = true;


      },error=>{
            console.log(error);
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

  SaveRequestsFake(request):void{
    console.log(request)
    this.sidebarService.toggle('out');
    this.loadingGrid = true;
    this.refreshRequests();


  }
  listCollections:Array<ComboButtonItem>=new Array<ComboButtonItem>();

  public fillListComboButtonCollection(customerType){
    this.listCollections=[];
    let comboButtonItem: ComboButtonItem=new ComboButtonItem();
    comboButtonItem.id=1;
    comboButtonItem.item=new ComboItem();
    comboButtonItem.item.value=1;
    comboButtonItem.item.name="پرینت فرم صدور کد";
    this.listCollections.push(comboButtonItem);
console.log(customerType);
    if(customerType==CustomerTypeEnum.legalInterior || customerType==CustomerTypeEnum.public)
      {
        let comboButtonItem2: ComboButtonItem=new ComboButtonItem();
        comboButtonItem2.id=2;
        comboButtonItem2.item=new ComboItem();
        comboButtonItem2.item.value=2;
        comboButtonItem2.item.name="پرینت فرم دارندگان حق امضا ";
        this.listCollections.push(comboButtonItem2);
      }

      if(customerType==CustomerTypeEnum.individualInterior)
      {
        let comboButtonItem3: ComboButtonItem=new ComboButtonItem();
        comboButtonItem3.id=3;
        comboButtonItem3.item=new ComboItem();
        comboButtonItem3.item.value=3;
        comboButtonItem3.item.name="پرینت فرم نمونه امضا حقیقی ";
        this.listCollections.push(comboButtonItem3);
      }

  }

  showRequestDetails(requestId){
    console.log(this.selectedRequestItemResult);
    if(this.selectedRequestItemResult && this.selectedRequestItemResult.customerType)
      this.customerTypeEnum=this.selectedRequestItemResult.customerType.id;
      console.log( this.customerTypeEnum);

  if(this.selectedRequestItemResult.customerType.id==CustomerTypeEnum.individualInterior)
    this.customerTypeEnum=CustomerTypeEnum.individualInterior;

  if(this.selectedRequestItemResult.customerType.id==CustomerTypeEnum.legalInterior)
    this.customerTypeEnum=CustomerTypeEnum.legalInterior;

    if(this.selectedRequestItemResult.customerType.id==CustomerTypeEnum.public)
      this.customerTypeEnum=CustomerTypeEnum.public;


     this.viewInProgress=true;

this.getBrokerRequestInfo= this.brokerRequests.getBrokerRequestInfo(this.selectedRequestItemResult.id,true,this.selectedRequestItemResult.customerType.id,
  this.selectedRequestItemResult.requestType.id).subscribe(result=>
{
  this.requestObj=result;
  console.log(this.requestObj);
  this.viewInProgress=false;
 

  this.typeOpereation = "showDetail";
  // this.mode="edit";
  this.mymenuState = "in";
  setTimeout(() => {
    this.sidebarService.toggle(this.mymenuState);
  }, 100);

  this.inActiveServ.changeStatus(true);
  this.state = true;


},error=>{
  console.log(error);
  this.viewInProgress=false;

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

  SetCustomerType(customerType):void{
    this.customerType=customerType;
    console.log(customerType);
  }


  updateRequests(request:any){
    //TODO: this.gridData.data.push(request);
    this.refreshAllRequest();
  }
  // TODO: this.selectedRequestItemResult.requestType
// TODO: Category Iran & Foreign People, I set all of them True!
  sendDataToServer=false;
    sendRequestToServer(){
      this.sendDataToServer=true;
      // this.checkIsSelectedRow(this.selectedRequestItemResult.id);
      this.brokerRequestsSendRequestSubscriber=  this.brokerRequests.sendDraftRequestToServer(this.selectedRequestItemResult.id,this.selectedRequestItemResult.requestType.id,
        true,this.selectedRequestItemResult.customerType.id).subscribe(result =>{
            this.sendDataToServer=false;
            this.closeModal();
           this.updateRequestInDataCollectionOfGrid(result);
       

          },error=>{
            console.log(error);
            this.closeModal();
            this.sendDataToServer=false;
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

  private updateRequestInDataCollectionOfGrid(result: any) {

    console.log('updateRequestInDataCollectionOfGrid Item is:')
    console.log(result)
    console.log(this.gridData);
    
    let updateitem = this.gridData.data.find(x => x.id == result.id);
    console.error(updateitem);
    
    if (updateitem !== undefined) {
      updateitem.requestStatus.id = result.requestStatus.id;
      updateitem.requestStatus.name = result.requestStatus.name;
      updateitem.requestStatus.value = result.requestStatus.value;
      updateitem.responseType.id = result.responseType.id;
      updateitem.responseType.name = result.responseType.name;
      updateitem.responseType.value = result.responseType.value;
      updateitem.requestSendDateTime = result.requestSendDateTime;
      updateitem.responseCreateDateTime = '';
      updateitem.responseSendDateTime = '';
    }
  }

  deleteSelectedRequest(){
    this.sendDataToServer=true;
    this.brokerRequestsDeleteRequestSubscriber=  this.brokerRequests.deleteDraftRequest(this.selectedRequestItemResult.id,this.selectedRequestItemResult.requestType.id,
      true,this.selectedRequestItemResult.customerType.id).subscribe(result =>{
        this.sendDataToServer=false;
        this.closeModal();
          this.refreshRequests();
        },error=>{
          console.log(error);
          this.closeModal();
          this.sendDataToServer=false;
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
//Error watingForGetPdf set false
  watingForGetPdf=false;
  getKeyOfIndividualInteriorForExporSubscriber: Subscription;
  getPdfOfRequestByKeySubscriber: Subscription;
  printMode: PrintModeEnum;
  exportPdf(){
    this.watingForGetPdf=true;
    this.getKeyOfIndividualInteriorForExporSubscriber= this.brokerRequests.getKeyOfIndividualInteriorForExportPdf(this.selectedRequestItemResult.id,this.printMode).subscribe(result =>{

            
           this.getPdfOfRequestByKeySubscriber=   this.brokerRequests.getPdfOfRequestByKey(result,this.printMode).subscribe(resultPdf =>{
              //this.brokerRequests.getPdfOfIndividualAuthoritySignatureForm(result).subscribe(resultPdf =>{
              this.watingForGetPdf=false;

              let fileName='print.pdf'
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
 

  @ViewChild('contentTemplate', { static: false }) contentTemplate: TemplateRef<any>;
  showDescription() {
    this.modalRef = this.modalService.open(this.contentTemplate,this.modalMedCloseAble)
  }

  comboItemClicked(comboItem){
    if(comboItem.item.value==1)//صدور کد
      this.printMode=PrintModeEnum.CodeIssuanceForm;

    if(comboItem.item.value==2)//دارندگان حق امضا حقوقی
      this.printMode=PrintModeEnum.SignedRightHolders;

    if(comboItem.item.value==3)//نمونه امضای حقیقی
      this.printMode=PrintModeEnum.SampleSignatureIndividualForm;

    this.exportPdf();
  }

    private modalMed = modalConfigSettingMedium;
    private modalMedCloseAble = modalConfigSettingLargeClosable;

    openConfirmDeleteModal(){
    this.modalRef = this.modalService.open(this.deleteModal,this.modalMed)
    }
    openConfirmSendRequestModal(){
      this.modalRef = this.modalService.open(this.sendModal,this.modalMed)
    }

    openAssignModal(){
      this.modalRef = this.modalService.open(this.assignModal,this.modalMed)
    }

    closeModal(){
        this.modalService.close(this.modalRef);
    }

    goToDocumentsManagement(id,data){
      let market:DocumentTypeEnum;
      if(this.selectedRequestItemResult.derivativesMarket && this.selectedRequestItemResult.spotMarket)
        market=DocumentTypeEnum.SpotMarketAndDerivativesMarket;
      else if(this.selectedRequestItemResult.derivativesMarket)
        market=DocumentTypeEnum.SpotMarketAndDerivativesMarket;
      else if(this.selectedRequestItemResult.spotMarket)
        market=DocumentTypeEnum.SpotMarket;
      
   this.router.navigate(['broker/documentsManagement/',id,data.customerType.id,data.name,false,market,1]);
 
    }
    assignRequestResult:assignRequestResult=new assignRequestResult();
    requestStatusChanged(eventObje){
      console.log(eventObje)
       this.assignRequestResult=eventObje;
      if(eventObje.status==='assignMode'){
        this.openAssignModal();
        return;
      }
      if(eventObje.status==='deleteMode'){
        this.notify.showErrorMessageBoxWithDuplicate(" شناسه "+ this.assignRequestResult.externalId +" هم اکنون جز لیست مشتریان شما می باشد!!!");
        return;

      }
      
    }
    brokerAssignRequestsSendRequestSubscriber: Subscription;
    brokerRemoveRequestsSendRequestSubscriber: Subscription;

    sendAssignRequestToServer(){
      this.sendDataToServer=true;
      this.brokerAssignRequestsSendRequestSubscriber=  this.brokerRequests.sendDraftAssignRequestToServer(this.assignRequestResult.externalId).subscribe(result =>{
            this.sendDataToServer=false;
            this.closeModal();
          //  this.updateRequestInDataCollectionOfGrid(result);
            console.log(result);
            

          },error=>{
            console.log(error);
            this.closeModal();
            this.sendDataToServer=false;
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


    sendRemoveRequestToServer(){
      this.sendDataToServer=true;
      this.brokerRemoveRequestsSendRequestSubscriber=  this.brokerRequests.sendDraftRemoveRequestToServer(this.assignRequestResult.externalId).subscribe(result =>{
            this.sendDataToServer=false;
            this.closeModal();
          //  this.updateRequestInDataCollectionOfGrid(result);
            console.log(result);
            

          },error=>{
            console.log(error);
            this.closeModal();
            this.sendDataToServer=false;
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
    ngAfterViewInit(): void {
      
    }

 
  
    
 
}


