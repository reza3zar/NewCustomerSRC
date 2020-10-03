import { NgxMaskModule } from 'ngx-mask';
import { NgbModule, NgbAlertModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DpDatePickerModule } from 'ng2-jalali-date-picker'; 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsBuilder } from './forms-builder.component';
import { DeciderComponent } from './Decider/decider.component';
import { TextareaComponent } from './Controls/textarea.component';
import { NumericTextboxComponent } from './Controls/numerictextbox.component';
import { MaskTextboxComponent } from './Controls/masktextbox.component';
import { RadioButtonComponent } from './Controls/radiobutton.component';
import { DatepickerfaComponent } from './Controls/datepickerfa.component'; 
import { TextboxComponent } from './Controls/textbox.component';
import { MoneyComponent } from './Controls/money.component';
import { ComboBoxComponent } from './Controls/combobox.component';
import { NumberDirective } from './numbersOnly.directive';
import { GridCollectionComponent } from './Controls/gridCollection';
import { GridModule } from '@progress/kendo-angular-grid';
import { CheckboxComponent } from './Controls/checkbox/checkbox';
import { DateFarsiTextBoxComponent } from './Controls/dateFarsiTextBox';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgxMaskModule.forRoot(),
    DpDatePickerModule,
    GridModule
  ],
  declarations: [
    FormsBuilder,
    DeciderComponent,
    TextboxComponent,
    MoneyComponent,
    TextareaComponent,
    ComboBoxComponent,
    RadioButtonComponent,
    MaskTextboxComponent,
    NumericTextboxComponent,
    GridCollectionComponent,
    DatepickerfaComponent,
    NumberDirective,
    CheckboxComponent,
    DateFarsiTextBoxComponent

  ],
  exports:[
    FormsBuilder,

  ],providers:[]
})
export class FormBuilderModule { }
