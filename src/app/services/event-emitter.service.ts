import {Injectable, EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  loggedIn = new EventEmitter();
  userName = new EventEmitter();
  logOut = new EventEmitter();

  constructor() { }

  sendAuthMessage(data: string) {
    this.loggedIn.emit(data);
  }

  sendUserName(data: string) {
    this.userName.emit(data);
  }

  sendToLogout(data: string) {
    this.logOut.emit(data);
  }
}