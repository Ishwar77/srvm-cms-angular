import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCustomPancard]'
})
export class CustomPancardDirective {

  // Allow decimal numbers. The \. is only allowed once to occur
  // private regex: RegExp = new RegExp(/^[a-zA-Z0-9]{0,10}$/g);// Main
  private regex: RegExp = new RegExp(/^([a-zA-Z]([a-zA-Z]([a-zA-Z]([a-zA-Z]([a-zA-Z]([0-9]([0-9]([0-9]([0-9]([a-zA-Z])?)?)?)?)?)?)?)?)?)?$/);

  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Enter', 'Backspace', 'Delete', 'Tab'];

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: any) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    // Do not use event.keycode this is deprecated.
    // this.el.nativeElement.value = event.target.value.toUpperCase();
    let current: string = this.el.nativeElement.value;
    // We need this because the current value on the DOM element
    // is not yet updated with the value from this event
    let next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }

  }

}
