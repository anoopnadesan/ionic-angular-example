import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { StorageService } from './storage.service';
import { API } from '../constants/api';
import { User } from './../models/user';
import { AuthResponse } from './../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  authSubject = new BehaviorSubject(false);

  constructor(
    private httpClient: HttpClient,
    private storage: StorageService) { }

  /**
   * @summary get access token from session storage
   * @returns returns access token 
   */
  get accessToken() {
    return this.storage.getItem("accessToken");
  }

  /**
   * @summary set access token to session storage
   * @param accessToken
   */
  set accessToken(accessToken) {
    this.storage.setItem("accessToken", accessToken);
  }

  /**
   * @summary get local id from session storage
   * @returns returns local id 
   */
  get localId() {
    return this.storage.getItem("localId");
  }

  /**
   * @summary set local id to session storage
   * @param localId
   */
  set localId(localId) {
    this.storage.setItem("localId", localId);
  }

  /**
   * @summary get client name from session storage
   * @returns returns client name 
   */
  get clientName() {
    return this.storage.getItem("clientName");
  }

  /**
   * @summary set client name to session storage
   * @param clientName
   */
  set clientName(clientName) {
    this.storage.setItem("clientName", clientName);
  }

  /**
   * @summary get client age from session storage
   * @returns returns client age 
   */
  get clientAge() {
    return this.storage.getItem("clientAge");
  }

  /**
   * @summary set client age to session storage
   * @param clientAge
   */
  set clientAge(clientAge) {
    this.storage.setItem("clientAge", clientAge);
  }

  /**
   * @summary get account numbers array from session storage
   * @returns returns account numbers array
   */
  get accountNumbers() {
    return this.storage.getItem("accountNumbers");
  }

  /**
   * @summary set account numbers array to session storage
   * @param accountNumbers
   */
  set accountNumbers(accountNumbers) {
    this.storage.setItem("accountNumbers", accountNumbers);
  }

  /**
   * @summary get  selected account number from session storage
   * @returns returns selected account number
   */
  get selectedAccountNumber() {
    return this.storage.getItem("selectedAccountNumber");
  }

  /**
   * @summary set selected account number to session storage
   * @param selectedAccountNumber
   */
  set selectedAccountNumber(selectedAccountNumber) {
    this.storage.setItem("selectedAccountNumber", selectedAccountNumber);
  }

  /**
   * @summary remove selected account number from session storage
   */
  removeSelectedAccountNumber() {
    this.storage.deleteItem("selectedAccountNumber");
  }

  /**
   * @summary Invokes user authentication API for authentication
   * @param User oject containing email, password and returnSecureToken
   * @returns Observable of authorization data such as idToken and local id
   */
  authenticate(user: User): Observable<AuthResponse> {
    return this.httpClient.post(API.AUTH_DOMAIN, {
      "email": user.email,
      "password": user.password,
      "returnSecureToken": true
    }, this.httpOptions).pipe(
      tap((res: AuthResponse) => {
        if (res) {
          this.localId = res.localId;
          this.accessToken = res.idToken;
        }
      })
    );
  }

  /**
   * @summary Clear all session storage to logout the system
   * @returns return to app component's signout to scope to redirect to login page
   */
  async signOut() {
    this.storage.clearDB();
    this.authSubject.next(false);
  }
}
