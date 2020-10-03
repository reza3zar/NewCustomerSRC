import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[ngxOnlyPersianChars]'
})
export class OnlyPersianCharsDirective {

  constructor(private el: ElementRef) {
    // el.nativeElement.style.backgroundColor = 'yellow';
 }

 @HostListener('keydown', ['$event']) onKeyDown(event) { 
        if(event.key=='Tab' || event.key=='Backspace')
          return true;
        
          
     var p=/^[\u0600-\u06FF\s]+$/;
    if(event.key.match(p)==null){
         event.preventDefault();
        return false;
    }
    return true;
}

}
