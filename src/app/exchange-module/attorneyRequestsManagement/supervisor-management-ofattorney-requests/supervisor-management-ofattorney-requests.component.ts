import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { modalConfigSettingLarge, modalConfigSettingMedium, modalConfigSettingLargeClosable } from '../../../../modalConfig';
import { Router } from '@angular/router';
import { DocumentService } from '../../../Services/document.service';
import { ModalManager } from 'ngb-modal';
import { NotifyManagement } from '../../../shared/NotifyManagement';
import { InActiveBackgroundService } from '../../../in-active-background.service';
import { SidebarService } from '../../../SlideInOutModule/sidebar.service';
import { ExchangeRequestsService } from '../../../Services/exchange-requests.service';
import { FormBuilder } from '@angular/forms';
import { Subscription, Subject, BehaviorSubject } from 'rxjs';
import { CompositeFilterDescriptor, SortDescriptor, orderBy, filterBy } from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { AttorneyRequestBrief } from './../../../Models/Attorney/attorneyRequestBrief';
import { AttorneyRequest } from './../../../Models/Attorney/AttorneyRequest';
import { AttorneyServiceService } from './../../../Services/attorney-service.service';
import { ComboItem } from '../../../Models/System/comboItem';
import { DocumentTypeEnum } from '../../../Models/CustomersModels/Enums/MarketEnum';
import { OperationTypeEnum } from '../../../Models/CustomersModels/Enums/OperationTypeEnum';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'ngx-supervisor-management-ofattorney-requests',
  templateUrl: './supervisor-management-ofattorney-requests.component.html',
  styleUrls: ['./supervisor-management-ofattorney-requests.component.scss']
})
export class SupervisorManagementOfattorneyRequestsComponent implements OnInit,OnDestroy {

  private modalRef;
  @ViewChild('contentTemplateResponsebrokerRequest', { static: false }) contentTemplateResponsebrokerRequest: TemplateRef<any>;

  constructor( private formBuilder: FormBuilder,
    private attorneyService:AttorneyServiceService,
    private sidebarService: SidebarService,
    private inActiveServ: InActiveBackgroundService,
    private notify: NotifyManagement,
    private modalService: ModalManager,
    private documentService:DocumentService,
    private router:Router,) { }
    public statusOfRequest:any=null;
    description:string='درخواست توسط سرپرست پذیرش مورد بررسی قرار گرفت';

    // sendDataToServer:Subject<boolean> = new BehaviorSubject(false);
    sendDataToServer:boolean;
 
  ngOnInit() {
    this.sendDataToServer=false;
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
  public selectedRequestItemResult: AttorneyRequestBrief = null;
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
  requestServiceSubscriber: Subscription;
  acceptRequestServiceSubscriber: Subscription;
  rejectRequestServiceSubscriber: Subscription;
  historyRequestServiceSubscriber: Subscription;


  customerType='';
  private modalLarge = modalConfigSettingLarge;
  private modalMed = modalConfigSettingMedium;
  private modallargeClosable = modalConfigSettingLargeClosable;
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

  closeAllModal(){
    this.modalService.close(this.modalRef);
}

ngOnDestroy(): void {
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
  let selectedCredit = new AttorneyRequestBrief();
  this.disableShowBtn = false;
  this.selectedRequestItemResult = e.selectedRows[0]
    ? (e.selectedRows[0].dataItem as AttorneyRequestBrief)
    : new AttorneyRequestBrief();

 
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


refreshRequests(){
  this.loadingGrid = true;

  this.requestServiceSubscriber = this.attorneyService.getAttorneyRequestsOfSupervisor().subscribe(result=>
    {
      this.dataRes = result.items as AttorneyRequestBrief[];
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

@ViewChild("contentTemplate", { static: false }) contentTemplate: TemplateRef<
    any
  >;
  showDescription() {}
  @ViewChild("contentTemplateResponsebrokerRequest", { static: false })


  openConfirmDeleteModal() {}
 
  

  deleteRequestFromDataGridCollection(updateitem) {
    const index = this.gridData.data.indexOf(updateitem, 0);
    if (index > -1) {
      this.gridData.data.splice(index, 1);
    }
  }

  private updateRequestInDataCollectionOfGrid(result: any) {
    let updateitem = this.gridData.data.find((x) => x.id == result.id);
    if (updateitem !== undefined) {
      this.deleteRequestFromDataGridCollection(updateitem);
    }
  }
  requestObj: any;
  customerTypeEnum: CustomerTypeEnum = CustomerTypeEnum.UnKnown;
  viewRequestInProgress = false;
 

  

  operations: Array<ComboItem> = [
    { name: " برگشت به کارگزار (فرم درخواست) ", value: 1 },
    { name: "برگشت به کارشناس (بررسی مجدد)", value: 2 },
    { name: "برگشت به کارگزار (اصلاح کامل)", value: 3 },
  ];

  selectedOperation : ComboItem=new ComboItem();

  changeOperations(opr: ComboItem) {
    this.selectedOperation.name = opr.name;
    this.selectedOperation.value = opr.value;

  }
  @ViewChild('commonResponses', { static: true }) commonResponses ;
  updateResponseStatusSubscriber: Subscription;
  changeOfResponseStatus(){
    this.modalRef = this.modalService.open(this.commonResponses,this.modalMed)
  }
  sendNewStateOfRequest(){
    console.log(this.statusOfRequest);
    if(this.statusOfRequest==null){
      this.notify.showErrorMessageBoxWithDuplicate("شرح پاسخ به درستی انتخاب نشده است!")
      return;
    }

    if (this.selectedRequestItemResult==undefined || this.selectedRequestItemResult==null)
    return;
    this.sendDataToServer=true;


 this.updateResponseStatusSubscriber= this.attorneyService.updateResponseIfAttorneyRequestsBySupervisor(this.selectedRequestItemResult.id,this.statusOfRequest.id,this.descriptionUpdateResponseStatus)
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
  descriptionUpdateResponseStatus:string='';

  responseComboValueChange(value){
    if(value && value.name)
      this.descriptionUpdateResponseStatus=value.name;
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

  refreshAllRequest(){
    this.refreshRequests();
  }

  operationType=OperationTypeEnum.None;
  isViewMode=true;
  attorneyRequest:any;
  showRequestDetails(requestId) {
    console.log(this.selectedRequestItemResult);
  
    this.viewRequestInProgress=true;
  
    this.attorneyService
      .getAttorneyRequestByIdExchangeSide(
        this.selectedRequestItemResult.id,false
      )
      .subscribe(
        (result) => {
          this.requestObj = result;
           this.attorneyRequest=this.requestObj
          console.log(this.requestObj);
          this.viewRequestInProgress = false;
          this.isViewMode=true;
          this.typeOpereation = "showDetail";
          this.operationType=OperationTypeEnum.View;
          // this.mode="edit";
          this.mymenuState = "in";
          setTimeout(() => {
            this.sidebarService.toggle(this.mymenuState);
          }, 100);
  
          this.inActiveServ.changeStatus(true);
          this.state = true;
        },
        (error) => {
          console.log(error);
          this.viewRequestInProgress = false;
  
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
          )
            return;
  
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

  isDownloading=false;

  downloadDocumentsSubscriber: Subscription;
  downloadAllDocumentsSubscriber: Subscription;
   
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
  
downloadDocuments(){
  this.isDownloading=true;
  if(this.selectedRequestItemResult==undefined)
    return;

    this.downloadDocumentsSubscriber= this.documentService.getStatusOfEvidenceByExchangeSide(this.selectedRequestItemResult.id,CustomerTypeEnum.UnKnown,DocumentTypeEnum.Attorney).subscribe(result=>{

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


acceptRequest() {
  // this.sendDataToServer.next(true);
  this.sendDataToServer=true;
  this.attorneyService
    .finalizeAttorneyRequestsBySupervisor(
      this.selectedRequestItemResult.id,
      this.description
    )
    .subscribe(
      (result) => {
        console.log(result);
        this.sendDataToServer=false;


        // this.refreshAllRequest();
        this.closeAllModal();
        this.description = 'درخواست توسط سرپرست پذیرش مورد بررسی قرار گرفت';
        this.updateRequestInDataCollectionOfGrid(result);
      },
      (error) => {
        this.sendDataToServer=false;
        
      }
    );
}

rejectSelectedRequest() {
  if(this.selectedOperation.value==0)
    {
      this.notify.showErrorMessageBoxWithDuplicate(
        "وضعیت نحوه برگشت درخواست به درستی انتخاب نشده است!"
      );

      return;
    }

    this.sendDataToServer=true;
  

  this.attorneyService
    .supervisorRejectRequestByReqId(
      this.selectedRequestItemResult.id,
      this.description,this.selectedOperation
    )
    .subscribe(
      (result) => {
    this.sendDataToServer=false;
        

        this.closeAllModal();
        this.description = "";
        this.updateRequestInDataCollectionOfGrid(result);
      },
      (error) => {
    this.sendDataToServer=false;
         
      }
    );
}

 

}
