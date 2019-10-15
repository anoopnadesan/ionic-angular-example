import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { ClientService } from '../../../services/client.service';
import { EventEmitterService } from '../../../services/event-emitter.service';
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

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private clientService: ClientService,
    private eventEmitterService: EventEmitterService,
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
   * Save account numbers of clients to storage and invokes the account details fetching API
   */
  async getClientDetails() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading accounts list. Please hold on..'
    });
    this.itsLoading(loading);    
    this.accountsData = [];

    this.clientService.getClientDetails()
      .subscribe((data: ClientResponse) => {
        this.eventEmitterService.sendUserName(data.name);
        let clientAge = data.age + "";
        this.authService.clientName = data.name;
        this.authService.clientAge = clientAge;
        this.authService.accountNumbers = JSON.stringify(data.accounts);
        this.clientService.getAccountDetails(data.accounts).subscribe(accountData => {
          loading.dismiss();
          this.accountsData.push(accountData);
        });
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
