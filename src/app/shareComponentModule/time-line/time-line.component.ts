import { Component, OnInit, Input } from '@angular/core';
import { TimeLineModel } from '../../Models/System/timeLineModel';

@Component({
  selector: 'ngx-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit {
  @Input() timeLineCollection:  Array<TimeLineModel>;


  constructor() { }
  ngOnInit() {

console.log(this.timeLineCollection)

    // this.timelineModel=new TimeLineModel();
    // this.collection=new Array<TimeLineModel>();
    // for (let index = 1; index < 5; index++) {
    // var  obj=new TimeLineModel();
    //   obj.id=index;
    //   obj.title='Title '+ index;
    //   obj.description='Description '+ index;
    //   this.collection.push(obj)

    // }

    // console.log(this.collection)
  }

}
