import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'ngx-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.scss']
})
export class InquiriesComponent implements OnInit,AfterViewInit {
  pageIsloaded=false;
  constructor(private router: Router 
    ,@Inject(LOCAL_STORAGE) private storage: WebStorageService) {
   }
  ngAfterViewInit(){
    $(document).ready(function(){
      var zindex = 10;
      
      $("div.card").click(function(e){
        e.preventDefault();
    
        var isShowing = false;
    
        if ($(this).hasClass("show")) {
          isShowing = true
        }
    
        if ($("div.cards").hasClass("showing")) {
          // a card is already in view
          $("div.card.show")
            .removeClass("show");
    
          if (isShowing) {
            // this card was showing - reset the grid
            $("div.cards")
              .removeClass("showing");
          } else {
            // this card isn't showing - get in with it
            $(this)
              .css({zIndex: zindex})
              .addClass("show");
    
          }
    
          zindex++;
    
        } else {
          // no cards in view
          $("div.cards")
            .addClass("showing");
          $(this)
            .css({zIndex:zindex})
            .addClass("show");
    
          zindex++;
        }
        
      });
    });

    
  }
  
  ngOnInit() {

    // if(this.storage.get("lastUrl")!=="" && this.storage.get("lastUrl")!==null){
    //   console.log('this.storage.get("lastUrl")!===Null')
    //   console.log(this.storage.get("lastUrl"));
      
    //   this.router.navigate['/broker'];
    //   this.storage.set("lastUrl","")
    // }
    // else{
    //   console.log('this.storage.get("lastUrl")===Null')
    // }

    
    this.pageIsloaded=true;
  }
  redirectToAddress(address){
  this.router.navigate([address])

  }
}

