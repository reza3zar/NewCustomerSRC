import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { SidebarService } from "../sidebar.service";
import { InActiveBackgroundService } from "../../in-active-background.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-slidebar-content",
  template: `
    <div style="width: 100%;height: 100%" class="acc">
      <ng-content> </ng-content>
    </div>
  `
})
export class SlidebarContentComponent implements OnInit, OnDestroy {
  @Input() bgColour: string;
  menuState: string = "";

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.localSubscriber = this.sidebarService.change.subscribe(myState => {
      this.menuState = myState;
    });


  }

  localSubscriber: Subscription;
  ngOnDestroy(): void {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }
    // this.localSubscriber.unsubscribe();
  }
}
