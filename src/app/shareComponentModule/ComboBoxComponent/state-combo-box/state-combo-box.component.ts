import {  OnInit, forwardRef, Component, OnDestroy } from "@angular/core";
import { NG_VALUE_ACCESSOR} from "@angular/forms";
import { Subscription } from "rxjs";
import { ComboItem } from "../../../Models/System/comboItem";
import { ComboBoxesService } from "../../../services/combo-boxes.service";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StateComboBoxComponent ),
  multi: true
};
const noop = () => {};
 @Component({
  selector: 'app-state-combo-box',
   templateUrl: './state-combo-box.component.html',
  styleUrls: ['./state-combo-box.component.css']
  , providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class StateComboBoxComponent  implements OnInit , OnDestroy{


  public dataCollection: Array<{ name: string; value: number }> = [];
  public static banksCollection = [];

  constructor(private  service : ComboBoxesService) { }

  ngOnInit() {
    if (StateComboBoxComponent.banksCollection.length <= 0)
    this.getBanksCollection();
  else this.dataCollection = StateComboBoxComponent.banksCollection;
  }

  localSubscriber:Subscription;
  ngOnDestroy() {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }
}

  getBanksCollection() {
    this.localSubscriber= this.service.getState().subscribe(data => {
      StateComboBoxComponent.banksCollection = data.slice();
      this.dataCollection = StateComboBoxComponent.banksCollection;
    });
  }

  handleFilter(value) {
    this.dataCollection = StateComboBoxComponent.banksCollection.filter(
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
