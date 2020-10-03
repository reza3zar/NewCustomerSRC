import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomControl } from '../Common/control';

@Component({
  selector: 'decider',
  templateUrl: './decider.component.html'
})
export class DeciderComponent implements OnInit {
  @Input() inputControl:CustomControl;
  @Input() form:any;
  @Output() contorlEventChanged = new EventEmitter();

  get isDirtyContol() {
    return this.form.controls[this.inputControl.name].dirty;
  }
  get isValidContol() {
    return this.form.controls[this.inputControl.name].valid;
  }

  constructor() { }

  ngOnInit() {
  }
  selectedItemChanged(value){


    this.contorlEventChanged.emit(value);
    // console.log(value);
  }

}
