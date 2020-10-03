import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, ViewChild,   Output, EventEmitter, AfterViewInit, OnChanges, HostListener, OnInit, forwardRef, Input, HostBinding } from '@angular/core';
import jQuery from 'jquery'
declare const DisplayMessage: any;
declare const inputValueChanged: any;
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => IMEPersianDatePickerComponent),
  multi: true
};
@Component({
  selector: 'ngx-imepersian-date-picker',
  templateUrl: './imepersian-date-picker.component.html',
  styleUrls: ['./imepersian-date-picker.component.scss'],
  providers:[CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class IMEPersianDatePickerComponent  implements  AfterViewInit,ControlValueAccessor {
  onChange=(_:any)=>{};
  emitChanges(){
   this.onChange(this.inputModel) //this.dte.nativeElement.value;
  }
  writeValue(obj: any): void {
    this.inputModel=obj;
  }
  registerOnChange(fn: any): void {
    this.onChange=fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log('setDisabledState called', isDisabled)
    // this.renderer.setElementProperty(this.dte.nativeElement, 'disabled',  isDisabled);
    // this.renderer.setProperty(this.dte.nativeElement, 'disabled', isDisabled);

    this.dateDisableStatus=isDisabled;
  }
 
  @ViewChild('dte', { static: false }) dte: any;
  inputModel: string;
  dateDisableStatus=false;
  @Input('disabled') disabled:boolean=false;
  @HostBinding('class.disabled')


  @Output() inputModelChange = new EventEmitter<string>();
  constructor( ) {
  }

  ngAfterViewInit() {
    DisplayMessage();
    inputValueChanged();
  }
  modelHasChanged(){

  this.inputModelChange.emit(this.inputModel)
  setTimeout(() => {
    this.onChange(this.dte.nativeElement.value)
  }, 1);
  }

  @HostListener("window:CallAngularService")
    onCallAngularService() {
      setTimeout(() => {
        this.onChange(this.dte.nativeElement.value)
      }, 1);
      this.inputModelChange.emit(this.dte.nativeElement.value);
    } 


}
