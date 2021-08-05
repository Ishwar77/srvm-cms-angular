import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'back-button',
  // templateUrl: '<button type="button" class="btn back-btn {{className}}" (click)="goBack()">{{buttonName}}</button>',
  templateUrl: "./app-back-button.component.html",
  styleUrls: ['./app-back-button.component.css']
})
export class AppBackButtonComponent {
  @Input() color: string;
  @Input() buttonName: string;
  @Input() className: string;

  constructor(private location: Location) { }

  goBack() {
    this.location.back();
  }

}
