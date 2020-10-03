import {  OnInit, forwardRef, Component, OnDestroy, Output, EventEmitter, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR} from "@angular/forms";
import { Subscription } from "rxjs";
import { ComboItem } from "../../../Models/System/comboItem";
import { ComboBoxesService } from "../../../services/combo-boxes.service";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomerTypeComponent ),
  multi: true
};
const noop = () => {};
@Component({
  selector: 'app-customer-type',
  templateUrl: './customer-type.component.html',
  styleUrls: ['./customer-type.component.css']
  , providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})

 
export class CustomerTypeComponent implements  OnInit , OnDestroy{
  @Output() valueChanged = new EventEmitter<any>();
  @Input() disableStatus: boolean = true;

  public dataCollection: Array<{ name: string; value: number }> = [];
  public static banksCollection = [];

  constructor(private  service : ComboBoxesService) { }

  ngOnInit() {
    if (CustomerTypeComponent.banksCollection.length <= 0)
    this.getBanksCollection();
  else this.dataCollection = CustomerTypeComponent.banksCollection;
  }

  localSubscriber:Subscription;
  ngOnDestroy() {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }
}

  getBanksCollection() {
    this.localSubscriber= this.service.getCustomerTypes().subscribe(data => {
      CustomerTypeComponent.banksCollection = data.slice();
      this.dataCollection = CustomerTypeComponent.banksCollection;
    });
  }

  handleFilter(value) {
  

    this.dataCollection = CustomerTypeComponent.banksCollection.filter(
      s => s.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

  valueChange(value) {
    this.valueChanged.emit(value);
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
