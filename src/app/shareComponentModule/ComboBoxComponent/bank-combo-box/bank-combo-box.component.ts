import { ComboBoxesService } from './../../../services/combo-boxes.service';



import {  OnInit, forwardRef, Component, OnDestroy } from "@angular/core";
import { NG_VALUE_ACCESSOR} from "@angular/forms";
import { Subscription } from "rxjs";
import { ComboItem } from "../../../Models/System/comboItem";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BankComboBoxComponent ),
  multi: true
};

const noop = () => {};

  @Component({
  selector: 'app-bank-combo-box',
  templateUrl: './bank-combo-box.component.html',
  styleUrls: ['./bank-combo-box.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class BankComboBoxComponent implements OnInit , OnDestroy{


  public dataBanks: Array<{ name: string; value: number }> = [];
  public static banksCollection = [];

  constructor(private bankServ : ComboBoxesService) { }

  ngOnInit() {
    if (BankComboBoxComponent.banksCollection.length <= 0)
    this.getBanksCollection();
  else this.dataBanks = BankComboBoxComponent.banksCollection;
  }

  localSubscriber:Subscription;
  ngOnDestroy() {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }
}

public selectionChange(value: any): void {
  console.log('selectionChange', value);
}

  getBanksCollection() {
    this.localSubscriber= this.bankServ.getBanks().subscribe(data => {
      BankComboBoxComponent.banksCollection = data.slice();
      this.dataBanks = BankComboBoxComponent.banksCollection;
    });
  }

  handleFilterBanks(value) {
    this.dataBanks = BankComboBoxComponent.banksCollection.filter(
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
