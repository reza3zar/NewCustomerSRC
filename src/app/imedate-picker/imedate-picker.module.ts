import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMEPersianDatePickerComponent } from './imepersian-date-picker/imepersian-date-picker.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [IMEPersianDatePickerComponent],
  imports: [
    CommonModule,
    FormsModule,
 
  ],
  exports:[
    IMEPersianDatePickerComponent
  ]
})
export class IMEDatePickerModule { }
