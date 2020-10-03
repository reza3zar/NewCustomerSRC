import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IdentityDetails } from "../../Models/CustomersModels/Individual/identityDetails";

@Component({
  selector: "app-identity-management",
  templateUrl: "./identity-management.component.html",
  styleUrls: ["./identity-management.component.css"]
})
export class IdentityManagementComponent implements OnInit {
  @Input() gridDataCollection: Array<IdentityDetails> = new Array<
    IdentityDetails
  >();

  @Input() isViewMode: boolean = false;


  identityDetail: IdentityDetails = new IdentityDetails();
  submitted = false;
  requestForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.requestForm = this.formBuilder.group({
      code: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(20)]],
      identityType: ["", Validators.required]
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
  identityId = 1;

  get ctrl() {
    return this.requestForm.controls;
  }

  selectedRequestItemResult =null;
  onSubmit() {
    this.submitted = true;
    if (this.requestForm.invalid) {
      return;
    }
    if(this.gridDataCollection==null || this.gridDataCollection==undefined )
      this.gridDataCollection=new Array<IdentityDetails>();



    if (this.selectedRequestItemResult.id === undefined) {
      if((this.gridDataCollection) && this.gridDataCollection.length>0){
        this.gridDataCollection.forEach(item=>{
          this.identityId= item.id>=this.identityId?item.id:this.identityId;
        })
      }

      this.identityId++;
      this.identityDetail.id = this.identityId;
      this.gridDataCollection.push(this.identityDetail);
    } else {
      this.showUpdatedItem(this.identityDetail);
    }

    this.identityDetail = this.selectedRequestItemResult;// = new IdentityDetails();
    this.showNewRequest=false;
    this.submitted = false;

    
  }
  findIndexToUpdate(newItem) {
    return newItem.id === this;
  }

  showUpdatedItem(newItem) {
    let updateItem = this.gridDataCollection.find(
      this.findIndexToUpdate,
      newItem.id
    );

    let index = this.gridDataCollection.indexOf(updateItem);

    this.gridDataCollection[index] = newItem;
  }

  disableShowBtn = true;
  public selected(e) {
    let selectedCredit = new IdentityDetails();
    this.disableShowBtn = false;
    this.selectedRequestItemResult = e.selectedRows[0]
      ? (e.selectedRows[0].dataItem as IdentityDetails)
      : new IdentityDetails();

  }

  showNewRequest = false;

  createNewRequest() {
    this.selectedRequestItemResult= new IdentityDetails(); 
    this.showNewRequest = true;
  }

  @Output() clickedNext = new EventEmitter<void>();
  @Output() clickedPrevious = new EventEmitter<void>();

  onPrevious() {
    this.clickedPrevious.emit();
  }

  onNext() {
    this.clickedNext.emit();
    this.showNewRequest = false;
  }

  cancel() {
    this.showNewRequest = false;
    this.identityDetail = new IdentityDetails();
    this.disableShowBtn = true;
  }

  deleteItem(field: IdentityDetails) {
    // TODO:refactor & null Check !
    const arr: any = this.gridDataCollection.find(x => x.id == field.id);
    const indexItem: number = this.gridDataCollection.indexOf(arr);

    if (indexItem !== -1) {
      this.gridDataCollection.splice(indexItem, 1);
    }
  }

  deleteSelectedIdentify() {
    this.deleteItem(this.selectedRequestItemResult);
    this.selectedRequestItemResult = this.identityDetail = new IdentityDetails();
    this.disableShowBtn = true;
  }

  editSelectedIdentify() {
    this.identityDetail = this.selectedRequestItemResult;
    this.showNewRequest = true;
  }


  checkIsSelectedRow(itemId: number) {
      if (this.selectedRequestItemResult == undefined || this.selectedRequestItemResult == null)
        return true;

      if(  this.selectedRequestItemResult.id == itemId )
        return false;
      return true;
  }


}
