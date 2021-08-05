import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { SpinnerState } from './spinner-state';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  loaderText: string = 'Loading...';
  show = false;

  private subscription: Subscription;

  constructor(
    private spinnerService: SpinnerService
  ) { }

  ngOnInit() {
    this.subscription = this.spinnerService.spinnerSubject
      .pipe(
        delay(0),
      )
      .subscribe((state: SpinnerState) => {
        this.show = state.show;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
