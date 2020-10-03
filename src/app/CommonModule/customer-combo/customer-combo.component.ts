import { Component, OnInit, forwardRef, Input, OnDestroy } from "@angular/core";

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { ComboItem } from "../../Models/System/comboItem";
import { CustomerCollectionService } from "../../services/customer-collection.service";
import { Subscription } from "rxjs";
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomerComboComponent),
  multi: true
};

const noop = () => {};
@Component({
  selector: "app-customer-combo",
  templateUrl: "./customer-combo.component.html",
  styleUrls: ["./customer-combo.component.css"],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CustomerComboComponent implements OnInit, OnDestroy {
  public dataCustomers: Array<{ name: string; value: number }> = [];
  public static customersCollection = [];

  constructor(private customerserv: CustomerCollectionService) {}

  ngOnInit() {
    if (CustomerComboComponent.customersCollection.length <= 0)
      this.getCustomersCollection();
    else this.dataCustomers = CustomerComboComponent.customersCollection;
  }

  localSubscriber: Subscription;
  ngOnDestroy() {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }
  }

  private getCustomersCollection() {
    this.localSubscriber = this.customerserv
      .getAllCustomers()
      .subscribe(data => {
        CustomerComboComponent.customersCollection = data.slice();
        this.dataCustomers = CustomerComboComponent.customersCollection;
      });
  }

  handleFilterCustomers(value) {
    this.dataCustomers = CustomerComboComponent.customersCollection.filter(
      s => s.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }
  //The internal data model

  private innerValue: ComboItem = new ComboItem();
  @Input() disabled: boolean = false;

  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get value(): any {
    return this.innerValue.value;
  }

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
