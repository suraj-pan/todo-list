import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appAppStrikethrough]'
})
export class AppStrikethroughDirective {
//This an Input
  @Input("appStrikethrough")
  set strikethrough(value: boolean) {
    //this the setter of that input so whenever the parent sets a new value we react to that change
    if (value) {
      this.el.nativeElement.style.textDecoration = "line-through";
    } else {
      this.el.nativeElement.style.textDecoration = "None";
    }
  }

  constructor(private el: ElementRef) {}
//We Uue HostListener to listen to event on the elemnt where the directive is being Applied
  @HostListener("click") onClick() {
    console.log("Click Handler from Directive; Listening to Click Event Where I'm being Used", this.el);
  }


}
