import { ComboItem } from "./../../Models/System/comboItem";
import {
  Component,
  OnInit,
  OnDestroy,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { GridDataResult, PageChangeEvent } from "@progress/kendo-angular-grid";
import {
  SortDescriptor,
  orderBy,
  filterBy,
  CompositeFilterDescriptor,
} from "@progress/kendo-data-query";
import { Subscription } from "rxjs";
import { ExcelExportData } from "@progress/kendo-angular-excel-export";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import {
  NbDialogService,
  NbWindowService,
  NbWindowState,
  NbWindowRef,
} from "@nebular/theme";
import { SidebarService } from "../../SlideInOutModule/sidebar.service";
import { InActiveBackgroundService } from "../../in-active-background.service";
import { ExchangeRequestsService } from "../../Services/exchange-requests.service";
import { brokerRequest } from "../../Models/CustomersModels/Common/brokerRequest";
import { TimeLineModel } from "../../Models/System/timeLineModel";
import { NotifyManagement } from "../../shared/NotifyManagement";
import { ModalManager } from "ngb-modal";
import {
  modalConfigSettingLarge,
  modalConfigSettingLargeClosable,
  modalConfigSettingMedium,
} from "../../../modalConfig";
import { Router } from "@angular/router";
import {  DocumentTypeEnum } from "../../Models/CustomersModels/Enums/MarketEnum";
 

@Component({
  selector: "ngx-supervisor-management-of-requests",
  templateUrl: "./supervisor-management-of-requests.component.html",
  styleUrls: ["./supervisor-management-of-requests.component.scss"],
})
export class SupervisorManagementOfRequestsComponent
  implements OnInit, OnDestroy {
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
  viewRequestInProgress = false;
  public statusOfRequest:any=null;

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
  @ViewChild('commonResponses', { static: true }) commonResponses ;

  customerType = "";

  public selectedRequestItemResult: brokerRequest = null;

  constructor(
    private requests: ExchangeRequestsService,
    private sidebarService: SidebarService,
    private inActiveServ: InActiveBackgroundService,
    private notify: NotifyManagement,
    private modalService: ModalManager,
    private router: Router
  ) {}

  ngOnInit() {
    this.selectedOperation=new ComboItem();
    this.selectedOperation.name="";
    this.selectedOperation.value=0;
    this.gridData = {
      data: this.dataRes,
      total: 0,
    };

    this.sidebarSubscriber = this.sidebarService.change.subscribe((myState) => {
      this.mymenuState = myState;
      if (myState === "out") {
        setTimeout(() => {
          this.typeOpereation = "none";
        }, 1000);
      }
    });

    this.backGroundSubscriber = this.inActiveServ.change.subscribe(
      (myState) => {
        this.state = myState;
      }
    );

    this.refreshRequests();
  }

  refreshAllRequest() {
    this.refreshRequests();
  }

  refreshRequests() {
    this.loadingGrid = true;

    this.requestServiceSubscriber = this.requests
      .getSupervisorRequests()
      .subscribe(
        (result) => {
          this.dataRes = result.items as brokerRequest[];
          this.gridData.data = this.dataRes;
          try {
            this.gridData.total = this.dataRes.length;
          } catch (ex) {
            console.error(ex);
          }
          this.loadItems();

          this.loadingGrid = false;
        },
        (error) => {
          this.loadingGrid = false;
        }
      );
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

    if (this.updateResponseStatusSubscriber !== undefined) {
      this.updateResponseStatusSubscriber.unsubscribe();
    }

    if (this.historyRequestServiceSubscriber !== undefined) {
      this.historyRequestServiceSubscriber.unsubscribe();
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
      data: res,
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
    this.typeOpereation = "addNewRequest";
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
      total: this.dataRes.length,
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
      total: resultFilter.length,
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

    if (this.selectedRequestItemResult.id == itemId) {
      return false;
    }
    return true;
  }
  SaveRequestsFake(request): void {
    console.log(request);
    this.sidebarService.toggle("out");
    this.loadingGrid = true;
    this.refreshRequests();
  }

  SetCustomerType(customerType): void {
    this.customerType = customerType;
    console.log(customerType);
  }

  updateRequests(request: any) {
    this.gridData.data.push(request);
  }

  sendRequestToServer() {
    // this.checkIsSelectedRow(this.selectedRequestItemResult.id);
    // this.brokerRequests.sendDraftRequestToServer(this.selectedRequestItemResult.id,this.selectedRequestItemResult.requestType.id,
    //   true,this.selectedRequestItemResult.customerType.id).subscribe(result =>{
    //       console.log(this.result);
    //       this.refreshRequests();
    // })
  }

  deleteSelectedRequest() {
    // this.brokerRequests.deleteDraftRequest(this.selectedRequestItemResult.id,this.selectedRequestItemResult.requestType.id,
    //   true,this.selectedRequestItemResult.customerType.id).subscribe(result =>{
    //       this.refreshRequests();
    // })
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

  @ViewChild("contentTemplate", { static: false }) contentTemplate: TemplateRef<
    any
  >;
  showDescription() {}
  @ViewChild("contentTemplateResponsebrokerRequest", { static: false })
  contentTemplateResponsebrokerRequest: TemplateRef<any>;

  statusOfResponseIsReject = true;
  ModalTitleBaseOnOperation = "";
  modalVal: any;
  responseRequest(statusOfResponseIsReject: boolean) {
    if (
      this.selectedRequestItemResult == undefined ||
      this.selectedRequestItemResult == null
    )
      return;

    this.statusOfResponseIsReject = statusOfResponseIsReject;
    if (this.statusOfResponseIsReject)
      this.ModalTitleBaseOnOperation = "رد درخواست برای : ";
    else this.ModalTitleBaseOnOperation = "تایید اولیه درخواست برای : ";

    this.modalRef = this.modalService.open(
      this.contentTemplateResponsebrokerRequest,
      this.modalLarge
    );
  }

  sendDataToServer: boolean = false;
  description: string = "";
  acceptSelectedRequest() {
    this.sendDataToServer = true;
    this.requests
      .supervisorAcceptRequestByReqId(
        this.selectedRequestItemResult.id,
        this.description
      )
      .subscribe(
        (result) => {
          console.log(result);
          this.sendDataToServer = false;
          // this.refreshAllRequest();
          this.closeAllModal();
          this.description = "";
          this.updateRequestInDataCollectionOfGrid(result);
        },
        (error) => {
          this.sendDataToServer = false;
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

    this.sendDataToServer = true;

    this.requests
      .supervisorRejectRequestByReqId(
        this.selectedRequestItemResult.id,
        this.description,this.selectedOperation
      )
      .subscribe(
        (result) => {
          this.sendDataToServer = false;

          this.closeAllModal();
          this.description = "";
          this.updateRequestInDataCollectionOfGrid(result);
        },
        (error) => {
          this.sendDataToServer = false;
        }
      );
  }
  historyRequestServiceSubscriber: Subscription;

  @ViewChild("contentHistoryOfRejectDescriptions", { static: false })
  contentHistoryOfRejectDescriptions: TemplateRef<any>;
  timeLineCollection: Array<TimeLineModel>;
  showTimeLineHistory() {
    if (
      this.selectedRequestItemResult == undefined ||
      this.selectedRequestItemResult == null
    )
      return;
    this.historyRequestServiceSubscriber = this.requests
      .getHistoryOfrejectRequestByRequestId(this.selectedRequestItemResult.id)
      .subscribe(
        (result) => {
          this.timeLineCollection = result.items;
          if (
            this.timeLineCollection == undefined ||
            this.timeLineCollection == null ||
            this.timeLineCollection.length == 0
          ) {
            this.notify.showErrorMessageBoxWithDuplicate(
              "تاریخچه رد درخواست یافت نشد!"
            );
            return;
          }

          this.modalRef = this.modalService.open(
            this.contentHistoryOfRejectDescriptions,
            this.modallargeClosable
          );
        },
        (error) => {
          console.log(error);
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
                this.notify.showErrorMessageBoxWithDuplicate(
                  errorMessageItem[1]
                );
              }
            }
          }
        }
      );
  }
  private modalLarge = modalConfigSettingLarge;
  private modallargeClosable = modalConfigSettingLargeClosable;

  openConfirmDeleteModal() {}

  private modalRef;

  closeAllModal() {
    this.modalService.close(this.modalRef);
  }

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

  showRequestDetails(requestId) {
    console.log(this.selectedRequestItemResult);
    if(this.selectedRequestItemResult.customerType.id==CustomerTypeEnum.individualInterior)
    this.customerTypeEnum=CustomerTypeEnum.individualInterior;

  if(this.selectedRequestItemResult.customerType.id==CustomerTypeEnum.public)
    this.customerTypeEnum=CustomerTypeEnum.public;

  if(this.selectedRequestItemResult.customerType.id==CustomerTypeEnum.legalInterior)
    this.customerTypeEnum=CustomerTypeEnum.legalInterior;
    this.viewRequestInProgress = true;

    this.requests
      .getBrokerRequestInfo(
        this.selectedRequestItemResult.id,
        true,
        this.selectedRequestItemResult.customerType.id,
        this.selectedRequestItemResult.requestType.id
      )
      .subscribe(
        (result) => {
          this.requestObj = result;
          console.log(this.requestObj);
          this.viewRequestInProgress = false;

          this.typeOpereation = "showDetail";
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

  goToDocumentsManagement(id, data) {
    let market: DocumentTypeEnum;
    if (
      this.selectedRequestItemResult.derivativesMarket &&
      this.selectedRequestItemResult.spotMarket
    )
      market = DocumentTypeEnum.SpotMarketAndDerivativesMarket;
    else if (this.selectedRequestItemResult.derivativesMarket)
      market = DocumentTypeEnum.SpotMarketAndDerivativesMarket;
    else if (this.selectedRequestItemResult.spotMarket)
      market = DocumentTypeEnum.SpotMarket;

    this.router.navigate([
      "exchange/documentsManagement/",
      id,
      data.customerType.id,
      data.name,
      true,
      market,
      -1
    ]);
  }

  operations: Array<ComboItem> = [
    { name: " برگشت به کارگزار (فرم درخواست) ", value: 1 },
    { name: "برگشت به کارشناس (بررسی مجدد)", value: 2 },
    { name: "برگشت به کارگزار (اصلاح کامل)", value: 3 },
  ];

  selectedOperation : ComboItem;

  changeOperations(opr: ComboItem) {
    this.selectedOperation.name = opr.name;
    this.selectedOperation.value = opr.value;

  }
  private modalMed = modalConfigSettingMedium;

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
  descriptionUpdateResponseStatus:string='';

  responseComboValueChange(value){
    if(value && value.name)
      this.descriptionUpdateResponseStatus=value.name;
  }
}
