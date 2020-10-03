import { AddressDetails } from './../../Models/CustomersModels/Individual/addressDetails';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StackeholdersInformation } from '../../Models/CustomersModels/Common/stackHoldersInformation';


@Component({
  selector: 'app-stackeholders-informations',
  templateUrl: './stackeholders-informations.component.html',
  styleUrls: ['./stackeholders-informations.component.css']
})
export class StackeholdersInformationsComponent implements OnInit {

  submitted = false;
  requestForm:FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.showNewRequest=false;
  }
  stackeholdersInformation: StackeholdersInformation=new StackeholdersInformation();
  @Input() gridDataCollection:Array<StackeholdersInformation>=new Array<StackeholdersInformation>();
  @Input() isViewMode: boolean = false;

  ngOnInit() {
  


    this.requestForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      position: ['', Validators.required],
      nationalCode: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(10) ]],
      postalCode: ['',   [Validators.required,Validators.minLength(10), Validators.maxLength(10) ]],
      votingRightPercent: ['', [Validators.required ]],
      shareHolderPercent: ['', [Validators.required ]],
      address:['', [ ]]
  });

  
      if((!this.gridDataCollection) || this.gridDataCollection.length==0)
      return;

      let id=100;
      this.gridDataCollection.forEach(element => {
        id++;
        if(element.id==0)
            element.id=id;
      });

  }

  get ctrl() { return this.requestForm.controls; }

  errorMinRecord="";
  onSubmit() {
  

    this.submitted = true;
    if (this.requestForm.invalid) {
      return;
  }

  if((this.selectedRequestItemResult.id===undefined))
  {
    if((this.gridDataCollection) && this.gridDataCollection.length>0){
      this.gridDataCollection.forEach(item=>{
        this.id= item.id>=this.id?item.id:this.id;
      })
    }

    this.id++;
    this.stackeholdersInformation.id= this.id;
    this.gridDataCollection.push(this.stackeholdersInformation)
  }
  else{

    this.showUpdatedItem(this.stackeholdersInformation)
  }

   this.stackeholdersInformation=this.selectedRequestItemResult=new StackeholdersInformation();
   this.showNewRequest=false;
   this.submitted = false;
  // this.removeValidators(this.requestForm)
  // this.addValidators(this.requestForm)

}


editSelectedItem(){
  this.stackeholdersInformation=this.selectedRequestItemResult;
  this.showNewRequest=true;

  if(this.stackeholdersInformation!=undefined && this.stackeholdersInformation.nationalCode!=undefined){
    this.stackeholdersInformation.nationalCode=this.stackeholdersInformation.nationalCode.trim();
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


id=1;
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
selectedRequestItemResult=new StackeholdersInformation();
public selected(e) {
  let selectedCredit = new StackeholdersInformation();
  this.disableShowBtn = false;
  this.selectedRequestItemResult = e.selectedRows[0]
    ? (e.selectedRows[0].dataItem as StackeholdersInformation)
    : new StackeholdersInformation();


}
showNewRequest=false;

createNewRequest(){
  this.errorMinRecord="";

  this.showNewRequest=true;
}

@Output() clickedNext = new EventEmitter<void>();
@Output() clickedPrevious = new EventEmitter<void>();

onPrevious(){
  this.clickedPrevious.emit();

}

onNext(){
  // if(this.gridDataCollection.length==0)
  // {
  //   this.errorMinRecord="لازم است حداقل مشخصات یک سهامدار یا شرکا دارای بیش از 10 درصد سهام(سرمایه) درج شود"
  //   return;
  // }
  
  this.clickedNext.emit();
  this.showNewRequest=false;

}

cancel(){
  this.showNewRequest=false;
  this.stackeholdersInformation=new StackeholdersInformation();
  this.disableShowBtn=true;
}

deleteItem(field:StackeholdersInformation) {
  //refactor & null Check !
  const arr: any = this.gridDataCollection.find(x=>x.id==field.id)
  const indexItem: number =  this.gridDataCollection.indexOf(arr)

  if (indexItem !== -1) {
      this.gridDataCollection.splice(indexItem, 1);
  }
}

deleteSelectedItem(){
  this.deleteItem(this.selectedRequestItemResult);
  this.selectedRequestItemResult=  this.stackeholdersInformation=new StackeholdersInformation();


  this.disableShowBtn=true;
}

checkIsSelectedRow(itemId: number) {
  if (this.selectedRequestItemResult == undefined || this.selectedRequestItemResult == null)
    return true;

  if(  this.selectedRequestItemResult.id == itemId )
    return false;
  return true;
}

}
