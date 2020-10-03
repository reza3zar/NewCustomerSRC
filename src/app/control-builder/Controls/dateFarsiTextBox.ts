import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CustomControl } from "../Common/control";
import * as moment from 'jalali-moment';

@Component({
  selector: "dateFarsiTextBox",
  template: `
    <div [formGroup]="form">
      <input
       [ngStyle]="{'display':controlValues.visible==undefined || controlValues.visible == false ? 'none' : 'inline' }"
        [attr.type]="controlValues.type"
        class="form-control"
        [id]="controlValues.id"
        [name]="controlValues.name"
        [formControlName]="controlValues.name"
        [placeholder]="controlValues.placeholder"
        [(ngModel)]="contractVal"
        [attr.required]="controlValues.required"
        [pattern]="controlValues.pattern"
      />
    </div>

  `
})


export class DateFarsiTextBoxComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() controlValues: CustomControl = {};

  contractVal:any;

  constructor() {}
  ngOnInit() {
    try {

      let persianDate=moment(this.controlValues.value, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
      this.contractVal=persianDate;
      // this.controlValues.value;
    } catch (error) {
      console.log(error)
    }

  }
}
