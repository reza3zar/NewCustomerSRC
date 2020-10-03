import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FinancialDetails } from '../../Models/CustomersModels/Individual/financialDetails';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-financial-details',
  templateUrl: './personal-financial-details.component.html',
  styleUrls: ['./personal-financial-details.component.css']
})
export class PersonalFinancialDetailsComponent implements OnInit {
  @Input() financialDetail:FinancialDetails=new FinancialDetails()
  @Input() isViewMode: boolean = false;

  submitted = false;
  requestForm:FormGroup;
  errorMinRecord:string;
  constructor(private formBuilder: FormBuilder) {

   }

  ngOnInit() {
    this.requestForm = this.formBuilder.group({
      ownerShipValue: ['', Validators.required],
      currency:['', Validators.required],
      averageSalaryPermonths: ['', Validators.required],
      predictContractValueINFutureMarket: ['', [Validators.required ]],
      predictContractValueINAuctionMarket: ['', [Validators.required ]],
      isAuctionMarket: ['', [ ]],
      isFutureMarket: ['', [ ]],
  });


  }
  get ctrl() { return this.requestForm.controls; }

  @Output() clickedNext = new EventEmitter<void>();
  @Output() clickedPrevious = new EventEmitter<void>();


  onSubmit() {

    if(this.financialDetail.ownerShipValue==0){
      this.errorMinRecord="فیلد ارزش روز دارایی نمی تواند صفر باشد!";
      return;
    }
//predictContractValueINAuctionMarket predictContractValueInSpotMarket
//predictContractValueINFutureMarket
    if(this.financialDetail.isSpotMarket==false && this.financialDetail.isFutureMarket==false){
      this.errorMinRecord="لازم است یکی از بازارها انتخاب شود!";
      return;
    }

    this.submitted = true;
    if (this.requestForm.invalid) {
      return;
  }
  this.clickedNext.emit();

}


onPrevious(){
  this.clickedPrevious.emit();

}
}
