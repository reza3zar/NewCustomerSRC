import { Router } from '@angular/router';
import { Component, OnInit, Injector, NgZone } from '@angular/core';

@Component({
  selector: 'ngx-un-authorized-page',
  templateUrl: './un-authorized-page.component.html',
  styleUrls: ['./un-authorized-page.component.scss']
})
export class UnAuthorizedPageComponent implements OnInit {

  constructor(private injector: Injector) { }

  ngOnInit() {
  }

  backToMainPage(){
    const routerService = this.injector.get(Router);
    const ngZone = this.injector.get(NgZone);//ngZone  اگر نباشد برای ری دایرکت کردن درست عمل نمی کند
    ngZone.run(() => {
      routerService.navigate([''], { skipLocationChange: true });
    });
  }

}
