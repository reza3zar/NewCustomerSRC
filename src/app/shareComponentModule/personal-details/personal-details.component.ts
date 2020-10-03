import { PersonalDetails } from "./../../Models/CustomersModels/Individual/personalDetails";
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, AfterViewInit, ElementRef, ViewChild, TemplateRef } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
@Component({
  selector: "app-personal-details",
  templateUrl: "./personal-details.component.html",
  styleUrls: ["./personal-details.component.css"]
})
export class PersonalDetailsComponent implements OnInit,OnDestroy {
  // dateObject: moment.Moment;

  submitted = false;
  requestForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private elementRef:ElementRef) {}
  @Input() personalDetailsInformation: PersonalDetails = new PersonalDetails();
  @Input() isViewMode: boolean = false;

 


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
  // @ViewChild('dte', { static: false }) dte: any;

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
    // this.personalDetailsInformation.birthDate=this.dateObject.format(
    //   "jYYYY/jMM/jD"
    // );
    // this.personalDetailsInformation.persianBirthBirthDate = this.dateObject.format(
    //   "jYYYY/jMM/jD"
    // );
    // if(this.dte.nativeElement.value)
    //   this.personalDetailsInformation.birthDate=this.dte.nativeElement.value;
    //   console.log(this.dte);
  
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
