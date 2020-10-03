import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CustomControl } from "../../Common/control";

@Component({
  selector: "checkbox",
  styleUrls: ["./chbox.css"],
  template: `
    <div [formGroup]="form">

      <div class="funkyradio">

      <div class="funkyradio-primary">

          <input
          [ngStyle]="{'display':controlValues.visible==undefined || controlValues.visible == false ? 'none' : 'inline' }"
          type="checkbox"  [(ngModel)]="controlValues.value"
          [formControlName]="controlValues.name" [name]="controlValues.name"  [id]="controlValues.id" />
          <label for="controlValues.id"      >controlValues.placeholder</label>
      </div>
    </div>

    </div>



  `
})


export class CheckboxComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() controlValues: CustomControl = {};
  constructor() {}

  // get isDirtyContol() {
  //   return this.form.controls[this.controlValues.name].dirty;
  // }
  // get isValidContol() {
  //   return this.form.controls[this.controlValues.name].valid;
  // }

  ngOnInit() {
  }
}
