import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CategoryCreditService } from '../../services';
import { ComboItem } from '../../Models/System/comboItem';
import { Subscription } from 'rxjs';
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CreditCategoryComboComponent),
  multi: true
};



const noop = () => {
};

@Component({
  selector: 'app-credit-category-combo',
  templateUrl: './credit-category-combo.component.html',
  styleUrls: ['./credit-category-combo.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CreditCategoryComboComponent  implements OnInit ,ControlValueAccessor   , OnDestroy {
  public dataCreditCategory: Array<{ name: string; value: number }> = [];
  public static creditCategoriesCollection = [];

  constructor( private CreditCatServe: CategoryCreditService) { }

  ngOnInit() {
    this.innerValue=new ComboItem();

    if (CreditCategoryComboComponent.creditCategoriesCollection.length <= 0)
    this.getcreditCategories();
  else
    this.dataCreditCategory =
    CreditCategoryComboComponent.creditCategoriesCollection;
  }

  getcreditCategories() {
    this.localSubscriber= this.CreditCatServe.getcreditCategories().subscribe(data => {
      CreditCategoryComboComponent.creditCategoriesCollection = data.slice();
      this.dataCreditCategory =
      CreditCategoryComboComponent.creditCategoriesCollection;
    });
  }

  handleFilterCreditCategories(value) {
    this.dataCreditCategory = CreditCategoryComboComponent.creditCategoriesCollection.filter(
      s => s.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

  localSubscriber:Subscription;
  ngOnDestroy() {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }
}

 private innerValue: ComboItem =new ComboItem();

 //Placeholders for the callbacks which are later providesd
 //by the Control Value Accessor
 private onTouchedCallback: () => void = noop;
 private onChangeCallback: (_: any) => void = noop;

 //get accessor
 get value(): any {
     return this.innerValue.value;
 };

 //set accessor including call the onchange callback
 set value(v: any) {
     if (v !== this.innerValue) {
         this.innerValue.value = v;
         this.onChangeCallback(v);
     }
 }

 //Set touched on blur
 onBlur() {
     this.onTouchedCallback();
 }

 //From ControlValueAccessor interface
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
