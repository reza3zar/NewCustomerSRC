import {Injectable, OnInit} from '@angular/core';
import {siteFeature} from "../model/site-feature";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";

@Injectable()
export class SiteFeatureService implements OnInit {
  siteFeatures:siteFeature[];
  constructor() {
    this.siteFeatures=[
      {id:1,title:"رضایتمندی مشتریان",description:"به سامانه ارتباط با مشتريان ايران خودرو خوش آمديد."},
      {id:2,title:"بهبود کارایی و ارزیابی",description:"به سامانه ارتباط با مشتريان ايران خودرو خوش آمديد."},
      {id:3,title:"مدیریت فرایند",description:"به سامانه ارتباط با مشتريان ايران خودرو خوش آمديد."},
      {id:4,title:"پیگیری وضعیت مشتری",description:"به سامانه ارتباط با مشتريان ايران خودرو خوش آمديد."},
    ];

  }

  ngOnInit(): void {

  }

  getSiteFeatures():Observable<any>{
    return of(this.siteFeatures);
  }




}
