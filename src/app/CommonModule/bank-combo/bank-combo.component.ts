import {  OnInit, forwardRef, Component, OnDestroy } from "@angular/core";
import { NG_VALUE_ACCESSOR} from "@angular/forms";
import { BankServiceService } from "../../services/bank-service.service";
import { ComboItem } from "../../Models/System/comboItem";
import { Subscription } from "rxjs";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BankComboComponent),
  multi: true
};

const noop = () => {};
 @Component({
  selector: 'app-bank-combo',
  templateUrl: './bank-combo.component.html',
  styleUrls: ['./bank-combo.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class BankComboComponent implements OnInit , OnDestroy{


  public dataBanks: Array<{ name: string; value: number }> = [];
  public static banksCollection = [];

  constructor(private bankServ : BankServiceService) { }

  ngOnInit() {
    if (BankComboComponent.banksCollection.length <= 0)
    this.getBanksCollection();
  else this.dataBanks = BankComboComponent.banksCollection;
  }

  localSubscriber:Subscription;
  ngOnDestroy() {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }
}

  getBanksCollection() {
    this.localSubscriber= this.bankServ.getBanks().subscribe(data => {
      BankComboComponent.banksCollection = data.slice();
      this.dataBanks = BankComboComponent.banksCollection;
    });
  }

  handleFilterBanks(value) {
    this.dataBanks = BankComboComponent.banksCollection.filter(
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
