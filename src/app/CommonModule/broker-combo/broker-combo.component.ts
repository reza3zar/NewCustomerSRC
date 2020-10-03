import { Component, OnInit, forwardRef, Input, OnDestroy } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { BrokerService } from "../../services/broker.service";
import { ComboItem } from "../../Models/System/comboItem";
import { Subscription } from "rxjs";
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BrokerComboComponent),
  multi: true
};

const noop = () => {};
@Component({
  selector: "app-broker-combo",
  templateUrl: "./broker-combo.component.html",
  styleUrls: ["./broker-combo.component.css"],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class BrokerComboComponent implements OnInit, OnDestroy {
  public dataBrokers: Array<{ name: string; value: number }> = [];
  public static brokersCollection = [];

  @Input() disabled: boolean = false;

  constructor(private brokerServ: BrokerService) {}

  ngOnInit() {
    if (BrokerComboComponent.brokersCollection.length <= 0)
      this.getBrokersCollection();
    else this.dataBrokers = BrokerComboComponent.brokersCollection;
  }
  localSubscriber: Subscription;
  ngOnDestroy() {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }
  }
  getBrokersCollection() {
    this.localSubscriber = this.brokerServ.getBrokers().subscribe(data => {
      BrokerComboComponent.brokersCollection = data.slice();
      this.dataBrokers = BrokerComboComponent.brokersCollection;
    });
  }

  handleFilterBrokers(value) {
    this.dataBrokers = BrokerComboComponent.brokersCollection.filter(
      s => s.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

  //The internal data model

  private innerValue: ComboItem = new ComboItem();

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
