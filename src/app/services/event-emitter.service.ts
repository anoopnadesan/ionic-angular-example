import {Injectable, EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  loggedIn = new EventEmitter();

  constructor() { }

  sendMessage(data: string) {
    this.loggedIn.emit(data);
  }
}