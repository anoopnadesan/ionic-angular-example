import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { ClientService } from '../../../services/client.service';
import { ClientResponse } from '../../../models/client-response';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.page.html',
  styleUrls: ['./account-list.page.scss'],
})
export class AccountListPage implements OnInit {
  /**
   * Account listing page 
   * Page routes to account listing page by default
   * Items array to store all accounts list data
   */
  accountsData: any = [];
  //clientInfo: any;

  constructor(
    public router: Router,
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private clientService: ClientService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (this.route && this.route.data) {
      /**
       * @summary Invoke the client details fetching API
       */
      this.getClientDetails();
    }
  }

  /**
   * @summary Invoke the client details fetching API
   */
  getClientDetails() {
    this.clientService.getClientDetails()
      .subscribe((data: ClientResponse) => {
        let clientAge = data.age + "";
        this.authService.clientName = data.name;
        this.authService.clientAge = clientAge;
        this.authService.accountNumbers = JSON.stringify(data.accounts);
        this.getAccountDetails(data.accounts);
      }, err => {
        console.log(err);
        this.authService.signOut()
          .then(res => {
            this.router.navigate(["/signin"]);
          }, err => {
            console.log(err);
          });
      });
  }

  /**
   * @summary Save account numbers of clients to storage and invokes the account details fetching API
   * @param accounts Array holding all the account number of client
   */
  getAccountDetails(accounts) {
    this.accountsData = [];
    this.clientService.getAccountDetails(accounts).subscribe((accountData) => {
      this.accountsData.push(accountData);
    });
  }

  /**
   * @summary Set selected account number in session and redirect to account transaction page
   * @param accountNumber selected account number
   */
  accountTransaction(selectedAccountNumber) {
    this.authService.selectedAccountNumber = selectedAccountNumber;
    this.router.navigate(["/account-transaction"]);
  }


  /**
   * @summary To show the loader untill we get account list data api response
   * 
   */
  async itsLoading(loading) {
    return await loading.present();
  }
}
