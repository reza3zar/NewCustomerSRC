import { Component, OnInit, AfterViewInit, HostListener, ElementRef, Input, ViewChild, Renderer2, Renderer, SimpleChanges, OnChanges, Output } from '@angular/core';
import * as $ from 'jquery';
import { ComboButtonItem } from '../../Models/Misc/ComboButtonItem';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'ngx-combo-button',
  templateUrl: './combo-button.component.html',
  styleUrls: ['./combo-button.component.scss'],
 
})
export class ComboButtonComponent implements OnInit,AfterViewInit {
  public text: String;
  constructor(private _eref: ElementRef) { 
       /**
     * This events get called by all clicks on the page
     */
 
}

// isFocusInsideComponent = false;
 
// isComponentClicked = false;

//     @HostListener('click')
//     clickInside() {
//         this.isFocusInsideComponent = true;
//         this.isComponentClicked = true;
//     }

    comboItemClicked(comboItem){
      this.comboItemClick.emit(comboItem);
            $(document).ready(function(){
        const combos = document.querySelectorAll(".combo-select--active"); 
        combos.forEach(combo => {
          combo.classList.remove('combo-select--active');
        });
        
      });
    }
    
    
  ngOnInit() {
    
  }


  @Input() collections:Array<ComboButtonItem>=new Array<ComboButtonItem>();
  @Input() isClicked=false;
  @Input() disabledCtrl=true;
  @Input() watingForGetPdf=false;
  @Output() comboItemClick= new EventEmitter();
  
   @HostListener('document:click', ['$event'])
  clickout(event) {
 
    // if(this._eref.nativeElement.contains(event.target)) {
    //   console.log('inside')
 
    // } else {
    //   console.log('out')
 
    // }
  }
  changeListStatus(){
    this.isClicked=!this.isClicked;
    if(this._eref.nativeElement.contains(event.target)) {
      $(document).ready(function(){
        const combos = document.querySelectorAll(".combo-select--active");
        if(combos.length>1){
          combos[1].classList.remove('combo-select--active');
          combos[0].classList.add('combo-select--active');
        }
      });
    } 

    // if(this.isClicked){
    //   this.isClicked=false;
    //   if(this.eRef.nativeElement.contains(event.target)) {
    //     $(document).ready(function(){
    //       const combos = document.querySelectorAll(".combo-select--active");
    //       console.log(combos)
  
    //       combos.forEach(combo => {
    //         combo.classList.remove('combo-select--active');
    //         // this.isClicked=!!this.isClicked;
  
    //       });
          
    //     });
    //   } 
    // }
    // else{
    //   this.isClicked=true;
    // }



    
  }
  ngAfterViewInit(){
    // $(document).ready(function(){
    //   const combos = document.querySelectorAll(".combo-select");
    //   combos.forEach(combo => {
    //     const comboButton = combo.querySelector('.combo-select__button');
    //     comboButton.addEventListener('click', function (event) {
    //       combo.classList.toggle('combo-select--active');
    //     });
    //   });
      
    // });

    
  }

}
