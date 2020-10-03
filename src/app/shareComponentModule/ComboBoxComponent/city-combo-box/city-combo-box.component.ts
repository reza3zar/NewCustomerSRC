import {  OnInit, forwardRef, Component, OnDestroy } from "@angular/core";
import { NG_VALUE_ACCESSOR} from "@angular/forms";
import { Subscription } from "rxjs";
import { ComboItem } from "../../../Models/System/comboItem";
import { ComboBoxesService } from "../../../services/combo-boxes.service";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CityComboBoxComponent ),
  multi: true
};

const noop = () => {};

@Component({
  selector: 'app-city-combo-box',
  templateUrl: './city-combo-box.component.html',
  styleUrls: ['./city-combo-box.component.css']
  , providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CityComboBoxComponent   implements OnInit , OnDestroy{


  public dataCollection: Array<{ name: string; value: number }> = [];
  public static banksCollection = [];

  constructor(private service : ComboBoxesService) { }

  ngOnInit() {
    if (CityComboBoxComponent.banksCollection.length <= 0)
    this.getBanksCollection();
  else this.dataCollection = CityComboBoxComponent.banksCollection;
  }

  localSubscriber:Subscription;
  ngOnDestroy() {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }
}

  getBanksCollection() {
    this.localSubscriber= this.service.getCities().subscribe(data => {
      CityComboBoxComponent.banksCollection = data.slice();
      this.dataCollection = CityComboBoxComponent.banksCollection;
    });
  }

  handleFilter(value) {
    this.dataCollection = CityComboBoxComponent.banksCollection.filter(
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
