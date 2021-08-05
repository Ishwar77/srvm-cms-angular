import { Directive, HostListener, ElementRef, Renderer2 } from "@angular/core";

@Directive({
  selector: "[customPincodeNumber]"
})
export class CustomPincodeNumberDirective {
  private regex: RegExp = new RegExp(/^[0-9]{0,6}$/g);
  private specialKeys: Array<string> = [
    "Enter",
    "Backspace",
    "Delete",
    "Tab",
    "End",
    "Home"
  ];
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {
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
