import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, filterBy, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { SidebarService } from '../../SlideInOutModule/sidebar.service';
import { InActiveBackgroundService } from '../../in-active-background.service';
import { CustomerBrief } from '../../Models/CustomersModels/Common/customerBrief';
import { NotifyManagement } from '../../shared/NotifyManagement';
import { ExchangeRequestsService } from '../../Services/exchange-requests.service';
import { modalConfigSettingMedium } from '../../../modalConfig';
import { ModalManager } from 'ngb-modal';
@Component({
  selector: 'ngx-migrate-to-oldsystems',
  templateUrl: './migrate-to-oldsystems.component.html',
  styleUrls: ['./migrate-to-oldsystems.component.scss']
})
export class MigrateToOldsystemsComponent  implements OnInit, OnDestroy {
  public mymenuState: string = "out";
  public mybg = "#fff";
  public typeOpereation = "";
  public gridData: GridDataResult;
  public sort: SortDescriptor[] = [];
  public loadingGrid = true;
  public disableBtn = false;
  public disableShowBtn = true;
  public panelTypeEnum: string = "";

  public pageSize = 20;
  public skip = 0;
  public state = false;
  private dataRes = [];
  public result;
  public filter: CompositeFilterDescriptor;
  public opened: boolean = false;

  sidebarSubscriber: Subscription;
  backGroundSubscriber: Subscription;
  requestServiceSubscriber: Subscription;

  customerType='';

  public selectedCustomer: CustomerBrief = null;

  constructor(
   
    private sidebarService: SidebarService,
    private inActiveServ: InActiveBackgroundService,
    private notify: NotifyManagement,
    private exchangeService:ExchangeRequestsService,
    private modalService: ModalManager,
    

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
    totalCount=0;
    refreshRequests(){
      this.loadingGrid = true;
      this.totalCount=0;
      this.requestServiceSubscriber = this.exchangeService.allCustomerReadytoMigration(this.pageSize).subscribe(result=>
        {
          console.log(result)
          this.dataRes = result.items as CustomerBrief[];
          this.gridData.data = this.dataRes;
          try {
            this.gridData.total = this.dataRes.length;
            this.totalCount = result.totalCount;
          } catch (ex) {
            console.error(ex);
          }
          this.loadItems();
          this.loadingGrid = false;
        })
    }

    customerSubscriber: Subscription;

    public loadMore(): void {
      if(this.pageSize==this.totalCount)
      {
        this.notify.showErrorMessageBoxWithDuplicate("تمامی اطلاعات دریافت شد");
        return;
      }
      this.pageSize+=20;
      if(this.pageSize>this.totalCount)
        this.pageSize=this.totalCount;

      
      this.loadingGrid = true;
          this.customerSubscriber= this.exchangeService.getAllCustomers(this.pageSize).subscribe(result=>{

            this.dataRes = result.items as CustomerBrief[];
            this.gridData.data = this.dataRes;
            try {
              this.gridData.total = this.dataRes.length;
              this.totalCount=result.totalCount;
            } catch (ex) {
              console.error(ex);
            }
            this.loadItems();
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
    if (this.customerSubscriber !== undefined) {
      this.customerSubscriber.unsubscribe();
    }
    
  }

  public sendRequestShowDialog() {
    if (
      this.selectedCustomer == null ||
      this.selectedCustomer === undefined
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
      total: this.dataRes.length
    };
  }

  public filterChange(filter: CompositeFilterDescriptor): void {
    this.filter = filter;
    this.loadAllItems();
  }

  public selected(e) {
    let selectedCredit = new CustomerBrief();
    this.disableShowBtn = false;
    this.selectedRequestItemResult = e.selectedRows[0]
      ? (e.selectedRows[0].dataItem as CustomerBrief)
      : new CustomerBrief(); 

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

  public selectedRequestItemResult: any = null;
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

  

  updateRequests(request:any){
    this.gridData.data.push(request);
  }
  sendRequestSubscriber: Subscription;
  sendDataToServer=false;
  sendRequest(){
    this.sendDataToServer=true;

    this.sendRequestSubscriber=  this.exchangeService.sendRequestToMigration(this.selectedRequestItemResult.id).subscribe(result =>{
          this.sendDataToServer=false;
          this.closeModal();
        //  this.updateRequestInDataCollectionOfGrid(result);
          this.notify.showSuccessMessageBoxWithDuplicate("درخواست با موفقیت ثبت شد!");
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

  @ViewChild('sendModal',{static:true}) sendModal;
  private modalMed = modalConfigSettingMedium;
  private modalRef;

  openConfirmSendRequestModal(){
    this.modalRef = this.modalService.open(this.sendModal,this.modalMed)
  }

  closeModal(){
    this.modalService.close(this.modalRef);
}

 

}
