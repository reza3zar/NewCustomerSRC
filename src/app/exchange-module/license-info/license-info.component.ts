import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {   InquiryService } from "../../services/inquiryService.service";
import { CustomControl } from "../../control-builder/Common/control";
import { inquiryTax } from "../../Models/CustomersModels/Inquiry/taxInquiry";
import { InActiveBackgroundService } from "../../in-active-background.service";
import { Subscription } from "rxjs";
import { SidebarService } from "../../SlideInOutModule/sidebar.service";
import { NotifyManagement } from '../../shared/NotifyManagement';
import { GItem } from '../../control-builder/Common/dataGridItem';

@Component({
  selector: 'ngx-license-info',
  templateUrl: './license-info.component.html',
  styleUrls: ['./license-info.component.scss']
})
export class LicenseInfoComponent implements OnInit,OnDestroy {
  submitted = false;
  requestForm: FormGroup; 
  public _collectionControls:  Array< CustomControl> =new Array< CustomControl>() ;
  public _collectionControlsTemp:  Array< CustomControl>=new Array< CustomControl>() ;
  public inquiryTax:inquiryTax=new inquiryTax();
  public mymenuState: string = "out";
  public mybg = "#fff";
  public typeOpereation = "";
  public state = false;
  constructor(
    private formBuilder: FormBuilder,
    private service: InquiryService,
    private inActiveServ: InActiveBackgroundService,
    private sidebarService: SidebarService,
    private notify:NotifyManagement
    
  ) {}
  sidebarSubscriber: Subscription;
  backGroundSubscriber: Subscription;
  servicesSubscriber: Subscription;
   
  states:Array<GItem>=new Array<GItem>();
  ngOnInit() {

    this.inquiryTax.type=0;

    var item=new GItem();
    item.data=0;
    item.header="نوع استعلام را انتخاب کنید";
    this.states.push(item);

    var item3=new GItem();
    item3.data=3;
    item3.header="شناسه کسب و کار";
    this.states.push(item3);

    var item1=new GItem();
    item1.data=1;
    item1.header="شناسه ملی";
    this.states.push(item1);

    var item2=new GItem();
    item2.data=2;
    item2.header="کد ملی";
    this.states.push(item2);




    this.requestForm = this.formBuilder.group({
      nationalCode: ["", Validators.required],
      type: [""]

    });

    this.backGroundSubscriber = this.inActiveServ.change.subscribe(myState => {
      this.state = myState;
    });

    this.sidebarSubscriber = this.sidebarService.change.subscribe(myState => {
      this.mymenuState = myState;
      if (myState === "out") {
        setTimeout(() => {
        this._collectionControls=[]
          this.typeOpereation = "none";
        }, 1000);
      }
    });

  }

  ngOnDestroy(): void {
    if (this.sidebarSubscriber !== undefined) {
      this.sidebarSubscriber.unsubscribe();
    }

    if (this.backGroundSubscriber !== undefined) {
      this.backGroundSubscriber.unsubscribe();
    }

    if (this.servicesSubscriber !== undefined) {
      this.servicesSubscriber.unsubscribe();
    }
  }

  
  pageLength=0;
  mapToCoorectFormat(dataResult:any,pageIndex=0) {
    this.pageLength=dataResult.length;
    console.log(dataResult)
    this._collectionControls=new Array<CustomControl>() ;
    for (let key of Object.keys(dataResult[pageIndex])) {
      
      let entity = dataResult[pageIndex][key];

      if(entity.type==='collection')
      {
        let collection=entity.items;

        entity.items=new Array<GItem>();
        let index=0;
        for(let counter of collection){
          var gItem:any={};
  
          for (let key2 of Object.keys(collection[index]) ) {
            // item.header=collection[0][key2].label;
            if(collection[index][key2].label!==undefined)
              gItem[collection[index][key2].label]=collection[index][key2].value;
            // item.rowNumber=index;
          }
          index++;
          entity.items.push(gItem);
        }
      }

      let mealName = dataResult[pageIndex][key];

      this._collectionControls.push(mealName);
    }


    this._collectionControls= this._collectionControls.sort((a, b) => a.order - b.order);
    
    this.typeOpereation==='showInquiry'
    this.mymenuState = "in";
    setTimeout(() => {
      this.sidebarService.toggle(this.mymenuState);
    }, 100);

    this.inActiveServ.changeStatus(true);
    this.state = true;
  }
 
 

  get ctrl() {
    return this.requestForm.controls;
  }
  formIsLoaded=false;
  collectionHelper:any;
  collectionSaver:any;
  inquiryTaxInfo(): void {
    if(this.inquiryTax.type==0)
    {
      this.notify.showErrorMessageBoxWithDuplicate("نوع استعلام گیری را انتخاب کنید");
      return;
    }

    this.submitted = true;
    this.formIsLoaded=true;

    if (this.requestForm.invalid) {
      return;
    }
    this.sendDataToServer=true;
    this._collectionControls=[];

    this.getlicenseInfoById();
}

    getlicenseInfoById(){
          try {
            this.servicesSubscriber=  this.service.getLicenseInfoById(this.inquiryTax.nationalCode,this.inquiryTax.type).subscribe(dataResult => {
              this.collectionSaver=[...dataResult]
      
          if(dataResult==null || dataResult==undefined|| dataResult.length==0)
            {
              this.formIsLoaded=false;
              this.sendDataToServer=false;
              this.notify.showErrorMessageBox('اطلاعاتی یافت نشد!');
              return;
            }
              this._collectionControlsTemp =new Array< CustomControl>() ;
              this._collectionControlsTemp.push(dataResult as CustomControl);
              this.collectionHelper=this._collectionControlsTemp[0];
              this.mapToCoorectFormat(this._collectionControlsTemp[0]);
                
              this.formIsLoaded=false;
              this.sendDataToServer=false;
        
            },error=>{
              this.formIsLoaded=false;
              this.sendDataToServer=false;
              
              if(error && error.status==500){
                this.notify.showErrorMessageBox("بروز خطا سروری، لطفا با واحد پشتیبانی تماس حاصل فرمایید");
                return;
              }

              if(error.status==0){
                this.notify.showErrorMessageBoxWithDuplicate("خطای سرور: سرویس از دسترس خارج می باشد!");
                return;
              }

            
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
          } catch (error) {
      
            this.formIsLoaded=false;
            this.sendDataToServer=false;
            
          }
    }

 


sendDataToServer=false;
 

 

pageChangedOccourred(pageIndexValue)
{
  this.servicesSubscriber=  this.service.getLicenseInfoById(this.inquiryTax.nationalCode,this.inquiryTax.type).subscribe(dataResult => {

    this.collectionSaver=[...dataResult]
    this.mapToCoorectFormat(this.collectionSaver,pageIndexValue-1)
  
  });

}



}






