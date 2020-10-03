import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-skeleton-loading-bars',
  templateUrl: './skeleton-loading-bars.component.html',
  styleUrls: ['./skeleton-loading-bars.component.scss']
})
export class SkeletonLoadingBarsComponent implements OnInit {
  @Input() numberOfCard:number;
  array:Array<number>=new Array<number>();
  constructor() { }

  ngOnInit() {
    // console.log(this.numberOfCard);
    
    // for (let index = 0; index < this.numberOfCard; index++) {
    //   this.array.push(index)
    // }
  }

}
