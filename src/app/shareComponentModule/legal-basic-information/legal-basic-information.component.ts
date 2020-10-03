import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { LegalBasicInformation } from '../../Models/CustomersModels/Legal/legalBasicInformation';

@Component({
  selector: 'app-legal-basic-information',
  templateUrl: './legal-basic-information.component.html',
  styleUrls: ['./legal-basic-information.component.css']
})
export class LegalBasicInformationComponent implements OnInit,OnDestroy {
  submitted = false;
  requestForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}
  @Input() legalBasicInformation: LegalBasicInformation = new LegalBasicInformation();
  @Input() isViewMode: boolean = false;

  ngOnDestroy(): void {
  }

  ngOnInit() {

    this.requestForm = this.formBuilder.group({
      companyName: ["", Validators.required],
      activityType: ["", Validators.required],
      legalType: ["", Validators.required],
      registerNumber: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(20)]],
      registerCity: ["", Validators.required],
      economicCode: ["", [Validators.required,Validators.minLength(12), Validators.maxLength(12)]],
      nationality: ["", Validators.required],
      isLocatedInFreeZones: ["" ],
      isLocatedInSpecialEconomicZones: ["" ],
      freeZone: ["" ],
      registerDate: ["" ],
      specialEconomicZones: ["" ],
      nationalCode: ["", [Validators.required]],
      signingProcedure: ['', [Validators.required ]],
    });


  }

  get ctrl() {
    return this.requestForm.controls;
  }

  @Output() clickedNext = new EventEmitter<void>();
  @Output() clickedPrevious = new EventEmitter<void>();
  errorMsg="";
  errorMsgLocatedInFreeZones="";
  errorMsgLocatedInSpecialEconomicZones="";


  onSubmit() {

  if(this.legalBasicInformation.isLocatedInFreeZones && !this.legalBasicInformation.isLocatedInFreeZones)
    {
      this.errorMsg="لازم است حداقل یک گزینه منطقه آزاد یا ویژه تجاری انتخاب شود"
      return;
    }

    if(this.legalBasicInformation.isLocatedInFreeZones && !this.legalBasicInformation.freeZone)
    {
      this.errorMsgLocatedInFreeZones="لازم است شهر منطقه آزاد تجاری و صنعتی انتخاب شود"
      return;
    }

    if(   (this.legalBasicInformation.isLocatedInSpecialZones && !(this.legalBasicInformation.specialZone))
       || (this.legalBasicInformation.isLocatedInFreeZones    && !(this.legalBasicInformation.freeZone) ) )
    {
      this.errorMsgLocatedInSpecialEconomicZones="لازم است شهر منطقه ویژه اقتصادی انتخاب شود"
      return;
    }

    this.submitted = true;
    if (this.requestForm.invalid ||  !(this.legalBasicInformation.registerDate)||
    this.legalBasicInformation.registerDate.trim()==='') {
      return;
    }
    this.clickedNext.emit();
    try {
      
      this.legalBasicInformation.registerNumber=(this.legalBasicInformation.registerNumber)?this.legalBasicInformation.registerNumber.toString().trim():'';

    } catch (error ) {

    }
  }

  onPrevious() {
    this.clickedPrevious.emit();
    try {
      this.legalBasicInformation.registerNumber=(this.legalBasicInformation.registerNumber)?this.legalBasicInformation.registerNumber.toString().trim():'';
    } catch (error) {
    }
  }
}
