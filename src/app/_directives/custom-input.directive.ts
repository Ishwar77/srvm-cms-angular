import { Directive, ElementRef, HostListener, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[onlyNumberCustom]'
})
export class CustomInputDirective {
  @Input('onlyNumberCustom') maxDidits: any;
  // Allow decimal numbers. The \. is only allowed once to occur
  private regex: RegExp = new RegExp(/^[0-9]{0,1}$/g);
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Delete'];

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    let regExp = '^[0-9]\{0,' + this.maxDidits + '\}\$';
    this.regex = new RegExp(regExp, 'g');

    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    // Do not use event.keycode this is deprecated.
    let current: string = this.el.nativeElement.value;
    // We need this because the current value on the DOM element
    // is not yet updated with the value from this event
    let next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }

  }

}
