import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { AppConstants } from '../../_helpers/app-constants';
import { AppMessagesEn } from '../../_helpers/app-messages-en';

@Component({
  selector: 'app-user-info',
  templateUrl: './app-user-info.component.html',
  styleUrls: ['./app-user-info.component.css']
})
export class AppUserInfoComponent implements OnInit {
  // App Data
  AppConstants = AppConstants;
  AppMessages;
  // User Session
  role: number = 0;
  userSession: any;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.userSession = this.authService.getUserData();
    if (this.userSession) {
      this.role = this.userSession.role;
      this.userSession.profile_image_url = this.authService.loadLiveDataImageFn(this.userSession.profile_image_url);
    }
    this.AppMessages = AppMessagesEn;
  }
  
  logout() {
    this.authService.logout();
  }

}

