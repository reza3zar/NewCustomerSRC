import { Component, OnInit, forwardRef, OnDestroy, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComboBoxesService } from '../../../services/combo-boxes.service';
import { Subscription } from 'rxjs';
import { ComboItem } from '../../../Models/System/comboItem';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SpecialZonesComboBoxComponent ),
  multi: true
};

const noop = () => {};

@Component({
  selector: 'ngx-special-zones-combo-box',
  templateUrl: './special-zones-combo-box.component.html',
  styleUrls: ['./special-zones-combo-box.component.scss']
  , providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SpecialZonesComboBoxComponent implements  OnInit , OnDestroy{
  @Input() disableStatus: boolean = true;

  public dataCollection: Array<{ name: string; value: number }> = [];
  public static collection = [];

  constructor(private  service : ComboBoxesService) { }

  ngOnInit() {
    if (SpecialZonesComboBoxComponent.collection.length <= 0)
    this.getBanksCollection();
  else this.dataCollection = SpecialZonesComboBoxComponent.collection;
  }

  localSubscriber:Subscription;
  ngOnDestroy() {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }
}

  getBanksCollection() {
    this.localSubscriber= this.service.getSpecialZones().subscribe(data => {
      SpecialZonesComboBoxComponent.collection = data.slice();
      this.dataCollection = SpecialZonesComboBoxComponent.collection;
    });
  }

  handleFilter(value) {
    this.dataCollection = SpecialZonesComboBoxComponent.collection.filter(
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
