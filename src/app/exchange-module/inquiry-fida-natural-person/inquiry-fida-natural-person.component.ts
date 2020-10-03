import { FidaPerson } from './../../Models/CustomersModels/Inquiry/fidaPerson';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomControl } from '../../control-builder/Common/control';
import { Depository } from '../../Models/CustomersModels/Inquiry/depository';
import { InquiryService } from '../../services/inquiryService.service';
import { InActiveBackgroundService } from '../../in-active-background.service';
import { SidebarService } from '../../SlideInOutModule/sidebar.service';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Subscription } from 'rxjs';
import { NotifyManagement } from '../../shared/NotifyManagement';

@Component({
  selector: 'app-inquiry-fida-natural-person',
  templateUrl: './inquiry-fida-natural-person.component.html',
  styleUrls: ['./inquiry-fida-natural-person.component.css']
})
export class InquiryFidaNaturalPersonComponent implements OnInit,OnDestroy {
  submitted = false;
  requestForm: FormGroup;
  public _collectionControls:  Array< CustomControl> =new Array< CustomControl>() ;
  public _collectionControlsTemp:  Array< CustomControl>=new Array< CustomControl>() ;
  public fidaoModel:FidaPerson=new FidaPerson();
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
      fidaCode: ["", Validators.required]
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


    // this.typeOpereation==='showInquiry'
    // this.mymenuState = "in";
    // setTimeout(() => {
    //   this.sidebarService.toggle(this.mymenuState);
    // }, 100);


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

  mapToCoorectFormat(dataResult) {
    for (let key of Object.keys(dataResult[0])) {

      let mealName = dataResult[0][key];

      this._collectionControls.push(mealName);
    }
    this._collectionControls= this._collectionControls.sort((a, b) => a.order - b.order);
    console.log(this._collectionControls)

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
  inquiryTaxInfo(): void {
    this.submitted = true;
    this.formIsLoaded=true;

    if (this.requestForm.invalid) {
      return;
    }
    this._collectionControls=[];
    this.sendDataToServer=true;
    this.servicesSubscriber=  this.service.getFidaNaturalPerson(this.fidaoModel.stringFidaId).subscribe(dataResult => {
      this._collectionControlsTemp=new Array< CustomControl>() ;
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



sendDataToServer=false;

 
}
