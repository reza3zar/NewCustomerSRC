import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComboBoxesService } from '../../../services/combo-boxes.service';
import { Subscription } from 'rxjs';
import { ComboItem } from '../../../Models/System/comboItem';
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SeriesLetterComboBoxComponent ),
  multi: true
};

const noop = () => {};

@Component({
  selector: 'ngx-series-letter-combo-box',
  templateUrl: './series-letter-combo-box.component.html',
  styleUrls: ['./series-letter-combo-box.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SeriesLetterComboBoxComponent  implements  OnInit , OnDestroy {


  public dataCollection: Array<{ name: string; value: number }> = [];
  public static collection = [];

  constructor(private  service : ComboBoxesService) { }

  ngOnInit() {
    if (SeriesLetterComboBoxComponent.collection.length <= 0)
    this.getSeriesLetterssCollection();
  else this.dataCollection = SeriesLetterComboBoxComponent.collection;
  }

  localSubscriber:Subscription;
  ngOnDestroy() {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }
}

  getSeriesLetterssCollection() {
    this.localSubscriber= this.service.getSeriesLetters().subscribe(data => {
      
      SeriesLetterComboBoxComponent.collection = data.slice();
      this.dataCollection = SeriesLetterComboBoxComponent.collection;
    });
  }

  handleFilter(value) {
try {
  this.dataCollection = SeriesLetterComboBoxComponent.collection.filter(

    s =>{
  
         s.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    }
  );
} catch (error) {
  
}

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
