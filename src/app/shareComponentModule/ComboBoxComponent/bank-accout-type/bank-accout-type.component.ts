import { ComboBoxesService } from './../../../services/combo-boxes.service';



import {  OnInit, forwardRef, Component, OnDestroy } from "@angular/core";
import { NG_VALUE_ACCESSOR} from "@angular/forms";
import { Subscription } from "rxjs";
import { ComboItem } from "../../../Models/System/comboItem";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BankAccoutTypeComponent ),
  multi: true
};

const noop = () => {};

@Component({
  selector: 'app-bank-accout-type',
  templateUrl: './bank-accout-type.component.html',
  styleUrls: ['./bank-accout-type.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class BankAccoutTypeComponent implements OnInit , OnDestroy{


  public dataBanks: Array<{ name: string; value: number }> = [];
  public static banksCollection = [];

  constructor(private bankServ : ComboBoxesService) { }

  ngOnInit() {
    if (BankAccoutTypeComponent.banksCollection.length <= 0)
    this.getBanksCollection();
  else this.dataBanks = BankAccoutTypeComponent.banksCollection;
  }

  localSubscriber:Subscription;
  ngOnDestroy() {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }
}

  getBanksCollection() {
    this.localSubscriber= this.bankServ.getAccountTypes().subscribe(data => {
      BankAccoutTypeComponent.banksCollection = data.slice();
      this.dataBanks = BankAccoutTypeComponent.banksCollection;
    });
  }

  handleFilterBanks(value) {
    this.dataBanks = BankAccoutTypeComponent.banksCollection.filter(
      s => s.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }


 private innerValue: ComboItem = new ComboItem();


 private onTouchedCallback: () => void = noop;
 private onChangeCallback: (_: any) => void = noop;


 get value(): any {
   return this.innerValue.value;
 }

 set value(v: any) {
   if (v !== this.innerValue) {
     this.innerValue.value = v;
     this.onChangeCallback(v);
   }
 }

 onBlur() {
   this.onTouchedCallback();
 }

 writeValue(value: any) {
   if (value !== this.innerValue.value) {
     this.innerValue.value = value;
   }
 }

 //From ControlValueAccessor interface
 registerOnChange(fn: any) {
   this.onChangeCallback = fn;
 }

 //From ControlValueAccessor interface
 registerOnTouched(fn: any) {
   this.onTouchedCallback = fn;
 }
}
