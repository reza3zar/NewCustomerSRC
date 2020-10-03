import { Component, OnInit, OnDestroy, forwardRef } from '@angular/core';
import { ComboItem } from '../../../Models/System/comboItem';
import {  Subscription } from 'rxjs';
import { ComboBoxesService } from '../../../services/combo-boxes.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DirectorateAuthoritiesComboBoxComponent ),
  multi: true
};

const noop = () => {};

@Component({
  selector: 'app-directorate-authorities-combo-box',
  templateUrl: './directorate-authorities-combo-box.component.html',
  styleUrls: ['./directorate-authorities-combo-box.component.css']
  , providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DirectorateAuthoritiesComboBoxComponent implements  OnInit , OnDestroy{


  public dataCollection: Array<{ name: string; value: number }> = [];
  public static collection = [];

  constructor(private  service : ComboBoxesService) { }

  ngOnInit() {
    if (DirectorateAuthoritiesComboBoxComponent.collection.length <= 0)
    this.getBanksCollection();
  else this.dataCollection = DirectorateAuthoritiesComboBoxComponent.collection;
  }

  localSubscriber:Subscription;
  ngOnDestroy() {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }
}

  getBanksCollection() {
    this.localSubscriber= this.service.getDirectorateAuthoritiesTypes().subscribe(data => {
      DirectorateAuthoritiesComboBoxComponent.collection = data.slice();
      this.dataCollection = DirectorateAuthoritiesComboBoxComponent.collection;
    });
  }

  handleFilter(value) {
    this.dataCollection = DirectorateAuthoritiesComboBoxComponent.collection.filter(
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
