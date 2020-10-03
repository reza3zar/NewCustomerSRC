import { Output, EventEmitter } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { CustomControl } from '../../control-builder/Common/control';
import { OperationBar } from '../../control-builder/Common/operationBar';

@Component({
  selector: 'app-show-result-info',
  templateUrl: './show-result-info.component.html',
  styleUrls: ['./show-result-info.component.css']
})
export class ShowResultInfoComponent implements OnInit {
  public operationBar: OperationBar = new OperationBar();
  collectionTemporary:  Array< CustomControl> =new Array< CustomControl>()
  @Input() collection:  Array< CustomControl> =new Array< CustomControl>() ;
  @Input() pageLength:number;
  @Output() pageChanged  = new EventEmitter<number>();


  constructor() { }
  pagerCollection:Array<number>=[];

  ngOnInit() {
    this.operationBar.showOperationBar = this.operationBar.showSuccessBtn = this.operationBar.showCancelBtn = false;
    this.operationBar.successBtnTitle = "استعلام جدید";
    this.operationBar.cancelBtnTitle = "خروج";

      for (let index = 1; index <= this.pageLength; index++) {
          this.pagerCollection.push(index);
        }
    // this.collectionTemporary=this.collection;
    // if(this.collectionTemporary.length>1)
    //   {
    //     this.collection=new  Array< CustomControl>() ;
    //     this.collection.push(this.collectionTemporary[this.pageNumber-1]);

    //     console.log(this.collection)
    //     for (let index = 1; index <= this.pageLength; index++) {
    //       this.pager.push(index);
    //     }
    //   }
  }

  changePager(pageIndex){
    this.pageChanged.emit(pageIndex)
  }

 

}
