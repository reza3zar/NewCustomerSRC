import { OnDestroy } from '@angular/core';
import { AccountType } from './../../Models/CustomersModels/Common/accountType';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankDetails } from '../../Models/CustomersModels/Individual/bankeDetails';
import { SidebarService } from '../../SlideInOutModule/sidebar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit,OnDestroy {
  // @Input() bankInfo:BankDetails=new BankDetails();
  // bankInfo:BankDetails=new BankDetails();
  @Input() gridDataCollection: Array<BankDetails> = new Array< BankDetails >();
  @Input() isViewMode: boolean = false;



  submitted = false;
  requestForm:FormGroup;
  showNewRequest=false;

  constructor(private formBuilder: FormBuilder,private serviceServer:SidebarService) { }

  ngOnInit() {


    this.requestForm = this.formBuilder.group({
      bank: ['', Validators.required],
      city: ['', Validators.required],
      branchName: ['', [Validators.required ]],
      branchCode: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(10) ]],
      accountTypes: ['', Validators.required],
      accountNumber: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(20) ]],
      IBANCode: ['', [Validators.required,Validators.minLength(26), Validators.maxLength(26) ]],
  });


  this.serviceServer.sendServerStatus.subscribe(result=>{
    this.sendDataToServer=result;
  })

  if((!this.gridDataCollection) || this.gridDataCollection.length==0)
  return;

  let id=100;
  this.gridDataCollection.forEach(element => {
    id++;
    if(element.id==0)
        element.id=id;
  });


  }

  sidebarSubscriber: Subscription;

  get ctrl() { return this.requestForm.controls; }

  @Output() clickedNext = new EventEmitter<void>();
  @Output() clickedPrevious = new EventEmitter<void>();

  @Output() clickedSaveRequest = new EventEmitter<Array<BankDetails>>();

  ngOnDestroy(): void {
    if (this.sidebarSubscriber !== undefined) {
      this.sidebarSubscriber.unsubscribe();
    }
  }

  saveRequest() {

  if(!(this.gridDataCollection) || this.gridDataCollection.length==0)
  {
    this.errorMinRecord="لازم است حداقل اطلاعات یک حساب بانکی درج شود"
    return;
  }
   this.sendDataToServer=true;
 
  this.clickedSaveRequest.emit(this.gridDataCollection);
 

  // this.clickedNext.emit();
  // console.log(this.personalDetailsInformation)
}

    errorMinRecord="";

    createNewRequest(){
      this.errorMinRecord="";
      this.showNewRequest=true;
    }



    onPrevious(){
      this.clickedPrevious.emit();

    }

    selectedRequestItemResult=new BankDetails();
    detailsInformation: BankDetails=new BankDetails();
    bankId=1;
    sendDataToServer=false;

    onSubmit() {
      this.submitted = true;
      if (this.requestForm.invalid) {
        return;

    }

    if(!this.gridDataCollection )
      this.gridDataCollection=new Array<BankDetails>();

    if((this.selectedRequestItemResult.id===undefined))
    {
      if((this.gridDataCollection) && this.gridDataCollection.length>0){
        this.gridDataCollection.forEach(item=>{
          this.bankId= item.id>=this.bankId?item.id:this.bankId;
        })
      }

      this.bankId++;
      this.detailsInformation.id= this.bankId;
      var accKind=new AccountType();
      accKind.id=1;
      this.detailsInformation.accountKind=accKind;
      this.gridDataCollection.push(this.detailsInformation)
    }
    else{

      this.showUpdatedItem(this.detailsInformation)
    }

    this.detailsInformation=this.selectedRequestItemResult=new BankDetails();
    this.showNewRequest=false;
    this.submitted = false;


    }

    findIndexToUpdate(newItem) {
      return newItem.id === this;
    }


    showUpdatedItem(newItem){
      let updateItem = this.gridDataCollection.find(this.findIndexToUpdate, newItem.id);

      let index = this.gridDataCollection.indexOf(updateItem);


      this.gridDataCollection[index] = newItem;

    }
    disableShowBtn = true;
    cancel(){
      this.showNewRequest=false;
      this.detailsInformation=new BankDetails();
      this.disableShowBtn=true;
    }

    public selected(e) {
      let selectedCredit = new BankDetails();
      this.disableShowBtn = false;
      this.selectedRequestItemResult = e.selectedRows[0]
        ? (e.selectedRows[0].dataItem as BankDetails)
        : new BankDetails();
    
    
    }
     
    editSelectedBankItem(){
      this.detailsInformation=this.selectedRequestItemResult;
      this.showNewRequest=true;
    }

    deleteSelectedBankItem(){
      this.deleteItem(this.selectedRequestItemResult);
      this.selectedRequestItemResult=  this.detailsInformation=new BankDetails();
    
    
      this.disableShowBtn=true;
    }

    deleteItem(field:BankDetails) {
      //refactor & null Check !
      const arr: any = this.gridDataCollection.find(x=>x.id==field.id)
      const indexItem: number =  this.gridDataCollection.indexOf(arr)
    
      if (indexItem !== -1) {
          this.gridDataCollection.splice(indexItem, 1);
      }
    }

    checkIsSelectedRow(itemId: number) {
      if (this.selectedRequestItemResult == undefined || this.selectedRequestItemResult == null)
        return true;

      if(  this.selectedRequestItemResult.id == itemId )
        return false;
      return true;
  }
}
