import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BankAccountDelegate } from '../../Models/CustomersModels/Common/bankAccountDelegate';


@Component({
  selector: 'app-bank-account-delegate',
  templateUrl: './bank-account-delegate.component.html',
  styleUrls: ['./bank-account-delegate.component.css']
})
export class BankAccountDelegateComponent implements OnInit {

  submitted = false;
  requestForm:FormGroup;
  constructor(private formBuilder: FormBuilder) { }
  bankItem: BankAccountDelegate=new BankAccountDelegate();
  @Input() gridDataCollection:Array<BankAccountDelegate>=new Array<BankAccountDelegate>();
  @Input() isViewMode: boolean = false;
   

  ngOnInit() {
 
 


    if(this.bankItem!=undefined && this.bankItem.nationalCode!=undefined){
      this.bankItem.nationalCode=this.bankItem.nationalCode.trim();
    }


   


    this.requestForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      position: ['', Validators.required],
      fatherName: ['', [Validators.required ]],
      birthDate: [''],
      nationalCode: ['', [Validators.required ,Validators.minLength(10), Validators.maxLength(10)]],
      postalCode: ['',   [Validators.required,Validators.minLength(10), Validators.maxLength(10) ]],
      address: ['', [Validators.required ]],

  });


      if((!this.gridDataCollection) || this.gridDataCollection.length==0)
      return;

      let id=100;
      this.gridDataCollection.forEach(element => {
        id++;
        if(element.bankId==0)
            element.bankId=id;
      });

  }

  get ctrl() { return this.requestForm.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.requestForm.invalid) 
      return;
 

  if(this.gridDataCollection==undefined || this.gridDataCollection==null)
    this.gridDataCollection=new Array<BankAccountDelegate>();

  if((this.selectedRequestItemResult.bankId===undefined))
  {
    if((this.gridDataCollection) && this.gridDataCollection.length>0){
      this.gridDataCollection.forEach(item=>{
        this.bankId= item.bankId>=this.bankId?item.bankId:this.bankId;
      })
    }

    this.bankId++;
    this.bankItem.bankId= this.bankId;
  
    this.gridDataCollection.push(this.bankItem);
  }
  else{
 
    this.showUpdatedItem(this.bankItem)
  }

   this.bankItem=this.selectedRequestItemResult=new BankAccountDelegate();
   this.showNewRequest=false;
   this.submitted = false;
  // this.removeValidators(this.requestForm)
  // this.addValidators(this.requestForm)

}


editSelectedbankItem(){
  this.bankItem=this.selectedRequestItemResult;
  this.showNewRequest=true;

  if(this.bankItem!=undefined && this.bankItem.nationalCode!=undefined){
    this.bankItem.nationalCode=this.bankItem.nationalCode.trim();
  }

 

}

showUpdatedItem(newItem){
  let updateItem = this.gridDataCollection.find(this.findIndexToUpdate, newItem.id);

  let index = this.gridDataCollection.indexOf(updateItem);


  this.gridDataCollection[index] = newItem;

}

findIndexToUpdate(newItem) {
      return newItem.id === this;
}


bankId=1;
public removeValidators(form: FormGroup) {
  for (const key in form.controls) {
       form.get(key).clearValidators();
       form.get(key).updateValueAndValidity();
  }
}

public addValidators(form: FormGroup) {
  for (const key in form.controls) {
       form.get(key).setValidators(this.requestForm[key]);
       form.get(key).updateValueAndValidity();
  }
}

disableShowBtn = true;
selectedRequestItemResult=new BankAccountDelegate();
public selected(e) {
  let selectedCredit = new BankAccountDelegate();
  this.disableShowBtn = false;
  this.selectedRequestItemResult = e.selectedRows[0]
    ? (e.selectedRows[0].dataItem as BankAccountDelegate)
    : new BankAccountDelegate();


}
showNewRequest=false;

createNewRequest(){
  this.selectedRequestItemResult=new BankAccountDelegate();
  this.errorMinRecord="";
  this.showNewRequest=true;
}

@Output() clickedNext = new EventEmitter<void>();
@Output() clickedPrevious = new EventEmitter<void>();

onPrevious(){
  this.clickedPrevious.emit();
 
  
  
}
errorMinRecord="";
onNext(){

  if(this.gridDataCollection==undefined || this.gridDataCollection==null || this.gridDataCollection.length==0)
  {
    this.errorMinRecord="لازم است حداقل مشخصات یک دارندگان حق برداشت درج شود"
    return;
  }
  console.log(this.gridDataCollection)
  this.clickedNext.emit();
  this.showNewRequest=false;

 
} 

cancel(){
  this.showNewRequest=false;
  this.bankItem=new BankAccountDelegate();
  this.disableShowBtn=true;
}

deleteItem(field:BankAccountDelegate) {

  const arr: any = this.gridDataCollection.find(x=>x.bankId==field.bankId)
  const indexItem: number =  this.gridDataCollection.indexOf(arr)

  if (indexItem !== -1) {
      this.gridDataCollection.splice(indexItem, 1);
  }
}

deleteSelectedbankItem(){
  this.deleteItem(this.selectedRequestItemResult);
  this.selectedRequestItemResult=  this.bankItem=new BankAccountDelegate();


  this.disableShowBtn=true;
}

checkIsSelectedRow(itemId: number) {
  if (this.selectedRequestItemResult == undefined || this.selectedRequestItemResult == null)
    return true;

  if(  this.selectedRequestItemResult.bankId == itemId )
    return false;
  return true;
}

}
