import { Injectable } from "@angular/core";
import { AppConstants } from "../_helpers/app-constants";
import { environment } from "src/environments/environment.prod";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
import { Event } from "src/app/_models/event.model";

@Injectable({
  providedIn: "root"
})
export class EventService {
  AppConstants: any = AppConstants;
  AppMessages: any;
  rolesArray: any[] = [];

  public static readonly URL_GET_EVENT_LIST_PUBLISHED =
    environment.apiUrl + "/api/event/list/published";
  public static readonly URL_POST_EVENT_SAVE =
    environment.apiUrl + "/api/event/save";
  public static readonly URL_GET_EVENT_BY_ID =
    environment.apiUrl + "/api/event/get";

  public static readonly URL_GET_EVENT_DELETE =
    environment.apiUrl + "/api/event/delete";
  public static readonly URL_GET_EVENT_DELETE_LIST =
    environment.apiUrl + "/api/event/deleteList";
  public static readonly URL_GET_CURRENTLY_RUNNING_LIST =
    environment.apiUrl + "/api/event/deleteList";

  public static readonly URL_GET_EVENT_LIST_END_DATE =
    environment.apiUrl + "/api/event/currentlyRunning";

  public static readonly URL_GET_EVENT_LIST_START_DATE =
    environment.apiUrl + "/api/event/completedDate";

  public static readonly URL_GET_EVENTS_IMAGE_UPLOAD =
    environment.apiUrl + "/api/events/image-upload";

  public static readonly URL_GET_EVENTS_IMAGE_UPLOAD_TWO =
    environment.apiUrl + "/api/events/image-upload_two";

  public static readonly URL_GET_EVENTS_IMAGE_UPLOAD_THREE =
    environment.apiUrl + "/api/events/image-upload_three";

  public static readonly URL_GET_EVENTS_IMAGE_UPLOAD_FOUR =
    environment.apiUrl + "/api/events/image-upload_four";

  public static readonly URL_GET_EVENTS_IMAGE_UPLOAD_FIVE =
    environment.apiUrl + "/api/events/image-upload_five";

  public static readonly URL_GET_STUDENT_IMAGE_UPLOAD_BY_ID =
    environment.apiUrl + "/api/student/profile-image/base64";

  public static readonly URL_GET_EVENT_ALL_LIST_BY_USER =
    environment.apiUrl + "/api/event/list";

  public static readonly URL_GET_EVENT_ALL_LIST_BY_USER_HOME =
    environment.apiUrl + "/api/event/byUser/list";

  public static readonly URL_GET_EVENT_ALL_LIST_BY_USER_HOME_UPCOMING_EVENT_DATE =
    environment.apiUrl + "/api/event/byUser/upcoming-list";

  public static readonly URL_GET_EVENT_ALL_LIST_BY_USER_HOME_COMPLETED_EVENT_DATE =
    environment.apiUrl + "/api/event/byUser/completed-list";

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  getList(pageno: number, limit: number) {
    let userToken = this.authService.getUserData();
    let urlToCall =
      EventService.URL_GET_EVENT_LIST_PUBLISHED + "/" + pageno + "/" + limit;
    return this.http.get(urlToCall);
  }

  save(modelObject: Event) {
    let userToken = this.authService.getUserData();
    let urlToCall = EventService.URL_POST_EVENT_SAVE;
    return this.http.post(urlToCall, modelObject);
  }

  update(modelObject: Event) {
    let userToken = this.authService.getUserData();
    let urlToCall = EventService.URL_POST_EVENT_SAVE;
    return this.http.post(urlToCall, modelObject);
  }

  getById(id: number) {
    let urlToCall = EventService.URL_GET_EVENT_BY_ID + "/" + id;
    return this.http.get(urlToCall);
  }

  delete(id: number) {
    let userToken = this.authService.getUserData();
    let urlToCall = EventService.URL_GET_EVENT_DELETE + "/" + id;
    return this.http.get(urlToCall);
  }
  deletedEvent(pageno: number, limit: number) {
    let userToken = this.authService.getUserData();
    let urlToCall =
      EventService.URL_GET_EVENT_DELETE_LIST + "/" + pageno + "/" + limit;
    return this.http.get(urlToCall);
  }
  currentlyrunning() {
    let userToken = this.authService.getUserData();
    let urlToCall = EventService.URL_GET_CURRENTLY_RUNNING_LIST;
    return this.http.get(urlToCall);
  }

  eventListByDate(pageno: number, limit: number) {
    let userToken = this.authService.getUserData();
    let urlToCall =
      EventService.URL_GET_EVENT_LIST_END_DATE + "/" + pageno + "/" + limit;
    return this.http.get(urlToCall);
  }

  eventListByStartate(pageno: number, limit: number) {
    let userToken = this.authService.getUserData();
    let urlToCall =
      EventService.URL_GET_EVENT_LIST_START_DATE + "/" + pageno + "/" + limit;
    return this.http.get(urlToCall);
  }

  imageUploadForEvent(modelObject: Event) {
    //let userToken = this.authService.getUserToken();
    console.log(modelObject)
    return this.http.post(
      EventService.URL_GET_EVENTS_IMAGE_UPLOAD,
      modelObject
    );
  }

  imageUploadForEventTwo(modelObject: Event) {
    //let userToken = this.authService.getUserToken();
    return this.http.post(
      EventService.URL_GET_EVENTS_IMAGE_UPLOAD_TWO,
      modelObject
    );
  }

  imageUploadForEventThree(modelObject: Event) {
    //let userToken = this.authService.getUserToken();
    return this.http.post(
      EventService.URL_GET_EVENTS_IMAGE_UPLOAD_THREE,
      modelObject
    );
  }

  imageUploadForEventFour(modelObject: Event) {
    //let userToken = this.authService.getUserToken();
    return this.http.post(
      EventService.URL_GET_EVENTS_IMAGE_UPLOAD_FOUR,
      modelObject
    );
  }

  imageUploadForEventFive(modelObject: Event) {
    //let userToken = this.authService.getUserToken();
    return this.http.post(
      EventService.URL_GET_EVENTS_IMAGE_UPLOAD_FIVE,
      modelObject
    );
  }

  getStudentImageById(id: number) {
    //let userToken = this.authService.getUserData();
    let urlToCall = EventService.URL_GET_STUDENT_IMAGE_UPLOAD_BY_ID + "/" + id;
    return this.http.get(urlToCall);
  }

  getEventListByUser(pageno: number, limit: number) {
    let urlToCall =
      EventService.URL_GET_EVENT_ALL_LIST_BY_USER + "/" + pageno + "/" + limit;
    return this.http.get(urlToCall);
  }

  getEventListByUserHome() {
    let urlToCall = EventService.URL_GET_EVENT_ALL_LIST_BY_USER_HOME;
    return this.http.get(urlToCall);
  }

  getEventListByUpcomingEventDate() {
    let urlToCall =
      EventService.URL_GET_EVENT_ALL_LIST_BY_USER_HOME_UPCOMING_EVENT_DATE;
    return this.http.get(urlToCall);
  }

  getEventListByCompletedEventDate() {
    let urlToCall =
      EventService.URL_GET_EVENT_ALL_LIST_BY_USER_HOME_COMPLETED_EVENT_DATE;
    return this.http.get(urlToCall);
  }
}
