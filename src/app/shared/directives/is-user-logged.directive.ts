import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[isLogged]'
})
export class IsUserLoggedDirective {

  @Input() set isLogged(isLoggedIn: boolean) {
    if(!isLoggedIn) {
      this.elementRef.nativeElement.style.display="none";
    } else {
      this.elementRef.nativeElement.style.display="block";
    }
  } 

  constructor(private elementRef: ElementRef) { }

}
