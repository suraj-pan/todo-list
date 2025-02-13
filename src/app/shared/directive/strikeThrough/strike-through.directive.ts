import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appStrikeThrough]'
})
export class StrikeThroughDirective {


  @Input('appStrikeThrough') // This should match the selector
  set strikethrough(value: boolean) {
    if (value) {
      this.el.nativeElement.style.textDecoration = 'line-through';
    } else {
      this.el.nativeElement.style.textDecoration = 'none';
    }
  }

  constructor(private el: ElementRef) {}

}
