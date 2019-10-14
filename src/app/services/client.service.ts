import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { StorageService } from './storage.service';
import { AuthService } from './auth.service';
import { API } from '../constants/api';
import { ClientResponse } from '../models/client-response';
import { AccountResponse } from '../models/account-response';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  clientUrl: string;
  accountUrl: string;

  constructor(
    private httpClient: HttpClient,
    private storage: StorageService,
    private authService: AuthService
  ) { }

  /**
   * @summary API for clients data update
   * @param accountNumber
   * @returns as Observable with client details(accounts, age and name)
   */
  updateClient(accountNumber) {
    let accountNumbers = JSON.parse(this.authService.accountNumbers);
    accountNumbers.push(accountNumber);
    this.authService.accountNumbers = JSON.stringify(accountNumbers)

    this.clientUrl = API.CLIENT_DOMAIN + '/clients/' + this.authService.localId + '.json?auth=' + this.authService.accessToken;

    return this.httpClient.put(this.clientUrl, {
      "accounts": JSON.parse(this.authService.accountNumbers),
      "age": this.authService.clientAge,
      "name": this.authService.clientName
    }, this.httpOptions)
      .pipe(map((res: ClientResponse) => {
      }));
  }

  /**
   * @summary API for accounts data update
   * @params accountNumber, accountData
   * @returns as Observable with account details(balance, min balance, overdraft and account type)
   */
  updateAccount(accountNumber, accountData: AccountResponse) {
    return this.httpClient.put(this.accountUrl.replace('ACCOUNTNUMBER', accountNumber), accountData, this.httpOptions)
      .pipe(map((res: AccountResponse) => {
      }));
  }

  /**
   * @summary Builds payload and API for getting the details of client
   * @returns as Observable with client details(idToken, loginId, client name, age)
   */
  getClientDetails() {
    this.clientUrl = API.CLIENT_DOMAIN + '/clients/' + this.authService.localId + '.json?auth=' + this.authService.accessToken;
    return this.httpClient.get(this.clientUrl)
      .pipe(map(client => client));
  }

  /**
   * @summary Invokes account details fetching API for every account number passed as list
   * @param accountNumber list of account numbers of client
   * @returns Observable of account details
   */
  getAccountDetails(accountNumber) {
    const source = from(accountNumber);
    return source.pipe(mergeMap(res => this.mapClientDetails(res)));
  }
  /**
   * @summary Invokes account fetching API for selected account number
   * @param accountNumber selected account number
   * @returns Observable of account data
   */
  getAccountData(accountNumber) {
    this.accountUrl = API.CLIENT_DOMAIN + '/accounts/ACCOUNTNUMBER.json?auth=' + this.authService.accessToken;
    
    return this.httpClient.get(this.accountUrl.replace('ACCOUNTNUMBER', accountNumber)).pipe(map(res => res));
  }

  /**
   * @summary Builds payload and API for getting account number details
   * @param accountNumber account number for which details is required
   * @returns Observable account details + account number
   */
  mapClientDetails(accountNumber) {
    this.accountUrl = API.CLIENT_DOMAIN + '/accounts/ACCOUNTNUMBER.json?auth=' + this.authService.accessToken;
    return this.httpClient.get(this.accountUrl.replace('ACCOUNTNUMBER', accountNumber)).pipe(map((accDetail) => {
      accDetail = { ...accDetail, accountNumber };
      return accDetail;
    }));
  }
}
