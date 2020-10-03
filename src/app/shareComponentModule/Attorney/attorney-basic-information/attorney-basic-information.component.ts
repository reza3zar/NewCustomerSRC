import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, AfterViewInit, ElementRef, ViewChild, TemplateRef } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { PersonalDetails } from '../../../Models/CustomersModels/Individual/personalDetails';
import { AttorneyRequest } from '../../../Models/Attorney/AttorneyRequest';

@Component({
  selector: 'ngx-attorney-basic-information',
  templateUrl: './attorney-basic-information.component.html',
  styleUrls: ['./attorney-basic-information.component.scss']
})
export class AttorneyBasicInformationComponent  implements OnInit,OnDestroy {
  // dateObject: moment.Moment;

  submitted = false;
  requestForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private elementRef:ElementRef) {}
    personalDetailsInformation: PersonalDetails = new PersonalDetails();
  @Input() isViewMode: boolean = false;
  @Input() attorneyRequest:AttorneyRequest=new AttorneyRequest();

 


  ngOnDestroy(): void {
  }
  direction: string = 'ltr';

  valuechange(newValue) {
    console.log(newValue)
  }

  onSearchChange(searchValue: string): void {  
    console.log(searchValue);
    this.personalDetailsInformation.birthDate=searchValue;
  }

  ngOnInit() {
    
    this.personalDetailsInformation=this.attorneyRequest.personalDetails;
    
    this.requestForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      gender: [""],
      birthDate: ["", []],
      fatherName: ["", [Validators.required]],
      identificationNumber: ["", [Validators.required]],
      registerCity: [""],
      nationality: [""],
      nationalCode: ["", [Validators.required]],
      clientInfo: [""],
      clientNationalCode: [""],
    
    });
  }

  get ctrl() {
    return this.requestForm.controls;
  }

  @Output() clickedNext = new EventEmitter<void>();
  @Output() clickedPrevious = new EventEmitter<void>();

  onSubmit() {
    this.submitted = true;
    if (this.requestForm.invalid ||  !(this.personalDetailsInformation.birthDate)||
        this.personalDetailsInformation.birthDate.trim()==='') {
      return;
    }


    this.clickedNext.emit();
    this.personalDetailsInformation.identificationNumber=this.personalDetailsInformation.identificationNumber!=null? this.personalDetailsInformation.identificationNumber.trim():'';
 
    console.log(this.personalDetailsInformation);
  }

  onPrevious() {



    this.clickedPrevious.emit();
 
  
  }
 

  onKey(event: any) { 
    var p=/^[\u0600-\u06FF\s]+$/;
    if(event.key.match(p)==null){
         event.preventDefault();
        return false;
    }
    return true;
  }

}
