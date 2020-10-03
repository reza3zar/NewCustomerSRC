import { EventEmitter, Injectable, Output } from '@angular/core';
import { InActiveBackgroundService } from '../in-active-background.service';

@Injectable()
export class SidebarService {

  constructor(private inActiveServ: InActiveBackgroundService) {
  }

  isOpenState = '';
  @Output() change: EventEmitter<string> = new EventEmitter();

  toggle(states: string) {
    this.change.emit(states);
    if (states === 'out')
      this.inActiveServ.changeStatus(false);
  }

  @Output() sendServerStatus: EventEmitter<boolean> = new EventEmitter();
    sendToServer(states: boolean) {
      this.sendServerStatus.emit(states);
    }
}
