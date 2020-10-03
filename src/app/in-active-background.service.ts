import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InActiveBackgroundService {

  constructor() { }
  isOpenState=false;
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  changeStatus(states:boolean) {
    this.change.emit(states);
  }
}
