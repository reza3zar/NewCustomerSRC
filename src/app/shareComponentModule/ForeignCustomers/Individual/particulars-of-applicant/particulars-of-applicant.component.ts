import { Component, OnInit, Output, EventEmitter, ElementRef, Input, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PersonalDetails } from '../../../../Models/CustomersModels/Individual/personalDetails';

@Component({
  selector: 'ngx-particulars-of-applicant',
  templateUrl: './particulars-of-applicant.component.html',
  styleUrls: ['./particulars-of-applicant.component.scss']
})
export class ParticularsOfApplicantComponent implements OnInit,OnDestroy {

  submitted = false;
  requestForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private elementRef:ElementRef) {}
  @Input() personalDetailsInformation: PersonalDetails = new PersonalDetails();
  @Input() isViewMode: boolean = false;

 


  ngOnDestroy(): void {
  }

  valuechange(newValue) {
    console.log(newValue)
  }

  onSearchChange(searchValue: string): void {  
    console.log(searchValue);
    this.personalDetailsInformation.birthDate=searchValue;
  }

  ngOnInit() {
    

    this.requestForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      gender: [""],
      economicCode: [""],
      martial: ["", [Validators.required]],
      birthDate: ["", []],
      fatherName: ["", [Validators.required]],
      identificationNumber: ["", [Validators.required]],
      registerCity: [""],
      nationality: [""],
      letterSeries:  ["", [Validators.required]],
      digitalSeries: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(2)]],
      serialIdentification: ["", [Validators.required,Validators.minLength(6), Validators.maxLength(6)]],
      nationalCode: ["", [Validators.required]]
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
    this.personalDetailsInformation.identificationNumber=this.personalDetailsInformation.identificationNumber!=null? this.personalDetailsInformation.identificationNumber.trim():'';
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
