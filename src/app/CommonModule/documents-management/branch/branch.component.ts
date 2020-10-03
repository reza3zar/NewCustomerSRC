import { filter } from 'rxjs/operators';
import { DocumentService } from './../../../Services/document.service';
import { Component, OnInit, ViewEncapsulation, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
import { DocumentTypeEnum } from '../../../Models/CustomersModels/Enums/MarketEnum';


@Component({
  selector: 'ngx-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss'],
  
})
export class BranchComponent implements OnInit {
 @Input() catId:number;
 @Input() allNodes:any;

 @Input() allNodesINDatabase:any;
 @Input() type:CustomerTypeEnum;
 @Output() nodeClickOccurred=new EventEmitter();
 nodes:any;

    
    constructor( ) { }

    ngOnInit() {

     

    // this.node1s=this.allNodes.filter(x=>x.evidence.categoryId==this.catId)
    if(this.type==CustomerTypeEnum.individualInterior) 
      this.nodes=this.allNodes.filter(x=>x.evidence.categoryId==this.catId && (x.evidenceType.id==5|| x.evidenceType.id==100 || x.evidenceType.id==1 || x.evidenceType.id==7) );

   

   else if(this.type==CustomerTypeEnum.legalInterior)
      this.nodes=this.allNodes.filter(x=>x.evidence.categoryId==this.catId && (x.evidenceType.id==6 || x.evidenceType.id==100 || x.evidenceType.id==2 || x.evidenceType.id==7) )

      else if(this.type==CustomerTypeEnum.public)
      this.nodes=this.allNodes.filter(x=>x.evidence.categoryId==this.catId && (  x.evidenceType.id==9 || x.evidenceType.id==10) )

     else this.nodes=this.allNodes.filter(x=>x.evidence.categoryId==this.catId && (x.evidenceType.id==DocumentTypeEnum.Attorney   ))// attorney

      // console.error(this.catId)
      // console.error(this.nodes)

  }

    
  checkNodeIsExist(nodeId){
    let item=this.allNodesINDatabase.filter(x=>x.evidence.id==nodeId);
    if(item!=undefined && item[0]!=undefined)
    {
      return item[0].exists;
    }
    return false;
  }
 
 
    openModal(){
    
      
      
      
      // this.modalRef = this.modalService.open(this.sendModal,this.modalMed)
    }

    nodeClicked(id){
      this.nodeClickOccurred.emit(id);
    }

}
