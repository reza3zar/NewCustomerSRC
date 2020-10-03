import { InActiveBackgroundService } from './../in-active-background.service';
import { OnInit, OnDestroy } from '@angular/core';
import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout [ngClass]="{ 'fullscreen-inActive': state }">
      <nb-menu right class="myOrginalFont menuRtl"  [items]="menu"></nb-menu>
      <router-outlet class="  myOrginalFont"  ></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit,OnDestroy {

  menu = MENU_ITEMS;
 
  constructor(private inActiveServ:InActiveBackgroundService)  {
    
  }  
  public state = false;
  backGroundSubscriber: Subscription;

  ngOnInit(): void {
    this.backGroundSubscriber = this.inActiveServ.change.subscribe(myState => {
      this.state = myState;
    });
  }

  ngOnDestroy():void{
    if (this.backGroundSubscriber !== undefined) {
      this.backGroundSubscriber.unsubscribe();
    }

  }
  
}
