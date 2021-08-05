import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SpinnerState } from './spinner-state';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  spinnerSubject = new Subject<SpinnerState>();
  constructor() {
  }

  show() {
    this.spinnerSubject.next(<SpinnerState>{ show: true });
  }

  hide() {
    this.spinnerSubject.next(<SpinnerState>{ show: false });
  }


}
