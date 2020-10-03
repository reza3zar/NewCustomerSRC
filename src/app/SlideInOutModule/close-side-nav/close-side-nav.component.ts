import {   OnInit, Component } from '@angular/core';
import { SidebarService } from '../sidebar.service';
import { InActiveBackgroundService } from '../../in-active-background.service';

@Component({
  selector: 'app-close-side-nav',
  templateUrl: './close-side-nav.component.html',
  styleUrls: ['./close-side-nav.component.css']
})
export class CloseSideNavComponent implements OnInit {

  constructor(private sidebarService:SidebarService,private inActiveServ:InActiveBackgroundService) { }

  ngOnInit() {
  }

  public closeNavBar(){
    this.sidebarService.toggle('out');
    this.inActiveServ.changeStatus(false);

  }

}
