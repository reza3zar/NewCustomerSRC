import { Component, OnInit, OnDestroy, forwardRef } from '@angular/core';
import { ComboItem } from '../../../Models/System/comboItem';
import {  Subscription } from 'rxjs';
import { ComboBoxesService } from '../../../services/combo-boxes.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MeasurementUnitsComboBoxComponent ),
  multi: true
};

const noop = () => {};


@Component({
  selector: 'app-measurement-units-combo-box',
  templateUrl: './measurement-units-combo-box.component.html',
  styleUrls: ['./measurement-units-combo-box.component.css']
  , providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class MeasurementUnitsComboBoxComponent implements  OnInit , OnDestroy{


  public dataCollection: Array<{ name: string; value: number }> = [];
  public static collection = [];

  constructor(private  service : ComboBoxesService) { }

  ngOnInit() {
    if (MeasurementUnitsComboBoxComponent.collection.length <= 0)
    this.getBanksCollection();
  else this.dataCollection = MeasurementUnitsComboBoxComponent.collection;
  }

  localSubscriber:Subscription;
  ngOnDestroy() {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }
}

  getBanksCollection() {
    this.localSubscriber= this.service.getMeasurementUnits().subscribe(data => {
      MeasurementUnitsComboBoxComponent.collection = data.slice();
      this.dataCollection = MeasurementUnitsComboBoxComponent.collection;
    });
  }

  handleFilter(value) {
    this.dataCollection = MeasurementUnitsComboBoxComponent.collection.filter(
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
