import { ComboBoxesService } from './../../../services/combo-boxes.service';



import {  OnInit, forwardRef, Component, OnDestroy } from "@angular/core";
import { NG_VALUE_ACCESSOR} from "@angular/forms";
import { Subscription } from "rxjs";
import { ComboItem } from "../../../Models/System/comboItem";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PartnershipsComponent ),
  multi: true
};

const noop = () => {};
 

@Component({
  selector: 'ngx-partnerships',
  templateUrl: './partnerships.component.html',
  styleUrls: ['./partnerships.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class PartnershipsComponent implements OnInit , OnDestroy{


  public dataassociations: Array<{ name: string; value: number }> = [];
  public static associationsCollection = [];

  constructor(private comboService : ComboBoxesService) { }

  ngOnInit() {
    if (PartnershipsComponent.associationsCollection.length <= 0)
    this.getassociationsCollection();
  else this.dataassociations = PartnershipsComponent.associationsCollection;
  }

  localSubscriber:Subscription;
  ngOnDestroy() {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }
}

public selectionChange(value: any): void {
  console.log('selectionChange', value);
}

  getassociationsCollection() {
    this.localSubscriber= this.comboService.getPartnerships().subscribe(data => {
      PartnershipsComponent.associationsCollection = data.slice();
      this.dataassociations = PartnershipsComponent.associationsCollection;
    });
  }

  handleFilterassociations(value) {
    this.dataassociations = PartnershipsComponent.associationsCollection.filter(
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
