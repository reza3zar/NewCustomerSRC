import { Component, OnInit, OnDestroy } from '@angular/core';
import { GItem } from '../../control-builder/Common/dataGridItem';
import { CustomControl } from '../../control-builder/Common/control';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotificationService } from '@progress/kendo-angular-notification';
import { SidebarService } from '../../SlideInOutModule/sidebar.service';
import { InActiveBackgroundService } from '../../in-active-background.service';
import { InquiryService } from '../../services/inquiryService.service';
import { VerifyCellPhone } from '../../Models/Misc/verifyCellPhone';
import { NotifyManagement } from '../../shared/NotifyManagement';

@Component({
  selector: 'app-inquiry-cell-info-legal',
  templateUrl: './inquiry-cell-info-legal.component.html',
  styleUrls: ['./inquiry-cell-info-legal.component.css']
})
export class InquiryCellInfoLegalComponent implements OnInit,OnDestroy {
  submitted = false;
  requestForm: FormGroup;
  public _collectionControls:  Array< CustomControl> =new Array< CustomControl>() ;
  public _collectionControlsTemp:  Array< CustomControl>=new Array< CustomControl>() ;
  public verifyInfo=new VerifyCellPhone();
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

  ngOnInit() {

    this.requestForm = this.formBuilder.group({
      ncode: ["", Validators.required],
      cellNumber: ["", Validators.required],
      nCeocode: ["", Validators.required],
    });

    this.backGroundSubscriber = this.inActiveServ.change.subscribe(myState => {
      this.state = myState;
    });

    this.sidebarSubscriber = this.sidebarService.change.subscribe(myState => {
      this.mymenuState = myState;
      if (myState === "out") {
        setTimeout(() => {
        this._collectionControls=[];
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


  get ctrl() {
    return this.requestForm.controls;
  }
  formIsLoaded=false;
  inquiry(): void {
    this.submitted = true;
    this.formIsLoaded=true;

    if (this.requestForm.invalid) {
      return;
    }
    this._collectionControls=[];
    this.sendDataToServer=true;
    this.servicesSubscriber=  this.service.getVerifyCellInfoLegalPerson(this.verifyInfo).subscribe(dataResult => {
      this._collectionControls=new Array< CustomControl>() ;
      this._collectionControlsTemp.push(dataResult as CustomControl);
      this.mapToCoorectFormat(this._collectionControlsTemp);
      this.formIsLoaded=false
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
}
mapToCoorectFormat(dataResult) {
  for (let key of Object.keys(dataResult[0])) {

    let entity = dataResult[0][key];
    if(entity.type==='collection')
      {
        let collection=entity.items;

        entity.items=new Array<GItem>();
        let index=0;
        for(let counter of collection){
          index++;
          var gItem:any={};

          for (let key2 of Object.keys(collection[0]) ) {
            // item.header=collection[0][key2].label;
            gItem[collection[0][key2].label]=collection[0][key2].value;
            // item.rowNumber=index;
          }
          entity.items.push(gItem);


        }
      }
    this._collectionControls.push(entity);
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


sendDataToServer=false;

 
}


