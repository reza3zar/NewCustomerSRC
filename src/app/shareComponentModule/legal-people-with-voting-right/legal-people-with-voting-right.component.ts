import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LegalPeopleWithVotingRight } from '../../Models/CustomersModels/Common/legalPeopleWithVoting';
import * as $ from 'jquery';

 


@Component({
  selector: 'app-legal-people-with-voting-right',
  templateUrl: './legal-people-with-voting-right.component.html',
  styleUrls: ['./legal-people-with-voting-right.component.css']
})
export class LegalPeopleWithVotingRightComponent implements OnInit {
 


  submitted = false;
  requestForm:FormGroup;
  constructor(private formBuilder: FormBuilder) { }
  legalPeopleWithVotingRight: LegalPeopleWithVotingRight=new LegalPeopleWithVotingRight();
  @Input() gridDataCollection:Array<LegalPeopleWithVotingRight>=new Array<LegalPeopleWithVotingRight>();
  @Input() isViewMode: boolean = false;

  ngOnInit() {
    console.error(this.legalPeopleWithVotingRight)

  
  

  
    this.requestForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      position: ['', Validators.required],
      assignmentExpirationDate:[''],
      assignmentDate:[''],
      nationalCode: ['',   [Validators.required,Validators.minLength(10), Validators.maxLength(10) ]],
      phone: ['', [Validators.minLength(11), Validators.maxLength(11),Validators.pattern('^(09)[0-9]{9}$')]],
      address: ['', [Validators.required ]],
      postalCode: ['',  [Validators.required,Validators.minLength(10), Validators.maxLength(10) ]],
      directorateAuthorities: ['', [Validators.required ]],
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


  onSubmit() {
    this.submitted = true;
    if (this.requestForm.invalid ||  !(this.legalPeopleWithVotingRight.assignmentDate)||
    this.legalPeopleWithVotingRight.assignmentDate.trim()==='' ||  !(this.legalPeopleWithVotingRight.assignmentExpirationDate)||
    this.legalPeopleWithVotingRight.assignmentExpirationDate.trim()==='')  
      return;

    if(this.gridDataCollection==null || this.gridDataCollection==undefined)
        this.gridDataCollection=new Array<LegalPeopleWithVotingRight>();
  

  if((this.selectedRequestItemResult.id===undefined))
  {
    if((this.gridDataCollection) && this.gridDataCollection.length>0){
      this.gridDataCollection.forEach(item=>{
        this.id= item.id>=this.id?item.id:this.id;
      })
    }
    this.id++;
    this.legalPeopleWithVotingRight.id= this.id;
    this.gridDataCollection.push(this.legalPeopleWithVotingRight)
  }
  else{

    
    this.showUpdatedItem(this.legalPeopleWithVotingRight)
  }

   this.legalPeopleWithVotingRight=this.selectedRequestItemResult=new LegalPeopleWithVotingRight();
   this.showNewRequest=false;
   this.submitted = false;
  // this.removeValidators(this.requestForm)
  // this.addValidators(this.requestForm)

}




editSelectedItem(){
  this.legalPeopleWithVotingRight=this.selectedRequestItemResult;
  this.showNewRequest=true;
  
  if(this.legalPeopleWithVotingRight!=undefined && this.legalPeopleWithVotingRight.nationalCode!=undefined){
    this.legalPeopleWithVotingRight.nationalCode=this.legalPeopleWithVotingRight.nationalCode.trim();
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
selectedRequestItemResult=new LegalPeopleWithVotingRight();
public selected(e) {
  let selectedCredit = new LegalPeopleWithVotingRight();
  this.disableShowBtn = false;
  this.selectedRequestItemResult = e.selectedRows[0]
    ? (e.selectedRows[0].dataItem as LegalPeopleWithVotingRight)
    : new LegalPeopleWithVotingRight();


}
showNewRequest=false;

createNewRequest(){
  this.selectedRequestItemResult=new LegalPeopleWithVotingRight();
  this.errorMinRecord="";
  this.showNewRequest=true;
}

@Output() clickedNext = new EventEmitter<void>();
@Output() clickedPrevious = new EventEmitter<void>();

onPrevious(){
  console.log(this.gridDataCollection);
   
  this.clickedPrevious.emit();

}
errorMinRecord="";
onNext(){
  if(this.gridDataCollection==undefined || this.gridDataCollection==null || this.gridDataCollection.length==0)
  {
    this.errorMinRecord="لازم است حداقل مشخصات مشخصات هیات عامل، حسابرس، بازرسان قانونی یا هیات امنا درج شود"
    return;
  }

  // console.log(this.gridDataCollection);
  
 
  this.clickedNext.emit();
  this.showNewRequest=false;

}

cancel(){
  this.showNewRequest=false;
  this.legalPeopleWithVotingRight=new LegalPeopleWithVotingRight();
  this.disableShowBtn=true;
}

deleteItem(field:LegalPeopleWithVotingRight) {
  //refactor & null Check !
  const arr: any = this.gridDataCollection.find(x=>x.id==field.id)
  const indexItem: number =  this.gridDataCollection.indexOf(arr)

  if (indexItem !== -1) {
      this.gridDataCollection.splice(indexItem, 1);
  }
}

deleteSelectedItem(){
  this.deleteItem(this.selectedRequestItemResult);
  this.selectedRequestItemResult=  this.legalPeopleWithVotingRight=new LegalPeopleWithVotingRight();


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
