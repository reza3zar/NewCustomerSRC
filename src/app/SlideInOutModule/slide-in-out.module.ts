import { SlidebarContentComponent } from './slidebar-content/slidebar-content.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidInOutComponent } from './slid-in-out/slid-in-out.component';
import { SidebarService } from './sidebar.service';
import { CloseSideNavComponent } from './close-side-nav/close-side-nav.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [

    CommonModule,
    FormsModule
  ],
  declarations: [
    SlidebarContentComponent,
    SlidInOutComponent,
    CloseSideNavComponent

  ],
  exports:[
    SlidebarContentComponent,
    SlidInOutComponent,
    CloseSideNavComponent
  ],
  providers:[
    SidebarService
  ]
})
export class SlideInOutModule { }
