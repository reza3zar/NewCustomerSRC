import { ExchangeRequestsService } from './../../Services/exchange-requests.service';
import { Component, OnInit, forwardRef, Input, OnDestroy, Output, EventEmitter } from "@angular/core";

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { ComboItem } from "../../Models/System/comboItem";
 
import { Subscription, noop } from "rxjs";
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ResponsesofRequestComponent),
  multi: true
};


@Component({
  selector: 'ngx-responsesof-request',
  templateUrl: './responsesof-request.component.html',
  styleUrls: ['./responsesof-request.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})


export class ResponsesofRequestComponent implements OnInit, OnDestroy {
  public dataresponses: Array<{ name: string; value: number }> = [];
  public static responsesCollection = [];
  @Output() valueChanged: EventEmitter<any> = new EventEmitter();
  constructor(private responseserv: ExchangeRequestsService) {}

  ngOnInit() {
   
      this.getresponsesCollection();
 
  }

  localSubscriber: Subscription;
  ngOnDestroy() {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }
  }
  responsesCollection= [];

  private getresponsesCollection() {
    
    this.localSubscriber = this.responseserv
      .getAllresponses()
      .subscribe(data => {
        console.error(data);
        this.responsesCollection= data.slice();
        ResponsesofRequestComponent.responsesCollection = data.slice();
        this.dataresponses = ResponsesofRequestComponent.responsesCollection;
      });
  }

  handleFilterresponses(value) {
    this.dataresponses = ResponsesofRequestComponent.responsesCollection.filter(
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

  public valueChange(value: any): void {
    this.valueChanged.emit(value);
}
}
