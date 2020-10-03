import {Component, EventEmitter, HostListener, Input, OnInit, Output, OnDestroy} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {SidebarService} from "../sidebar.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-slid-in-out',
  templateUrl: './slid-in-out.component.html',
  styleUrls: ['./slid-in-out.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'

      })),
      state('out', style({
        transform: 'translate3d(-100%, 0, 0)'

      })),
      transition('in => out', animate('900ms ease-in-out')),
      transition('out => in', animate('900ms ease-in-out'))
    ]),
  ]

})
export class SlidInOutComponent implements OnInit , OnDestroy{
  @Input() bgColour: string;
  public mymenuState: string = 'out';

  constructor(private sidebarService:SidebarService) {
  }
  localSubscriber:Subscription;
  ngOnInit() {

    this.localSubscriber= this.sidebarService.change.subscribe(myState => {
      this.mymenuState = myState;
    });



  }

  toggleMenu() {
    this.mymenuState = this.mymenuState === 'out' ? 'in' : 'out';
    this.sidebarService.toggle(this.mymenuState);
  }


  ngOnDestroy(): void {
    try {
      if (this.localSubscriber !== undefined) {
        this.localSubscriber.unsubscribe();
      }
    }
    catch(error) {
      console.log(error);
    }

  }
}


