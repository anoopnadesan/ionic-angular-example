import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { ClientService } from '../../../services/client.service';
import { AccountResponse } from '../../../models/account-response';

@Component({
  selector: 'app-account-transaction',
  templateUrl: './account-transaction.page.html',
  styleUrls: ['./account-transaction.page.scss']
})
export class TransactionsPage implements OnInit {
  /**
   * @summary Account transaction page 
   * Page routes to account listing page by default
   * Form group instance object to hold all account transaction form
   * Item variable to get selected account data using account id 
   */
  form: FormGroup;
  accountData: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    /**
     * Get selected account data initially
     */
    this.loadAccountData();
    this.resetFields();
  }

  /**
   * @summary
   * Function to reset new account creation form
   * form: form group instance object to create account form data 
   * 
   */
  resetFields() {
    this.form = this.formBuilder.group({
      transactionType: new FormControl('deposit', Validators.required),
      transactionAmount: new FormControl(null, [Validators.required, Validators.min(1)])
    });
  }

  /**
   * @summary summary getData function to get selected account data using account id from auth service
   * Data receieving through accountListResolver
   * Subscribed through routes, set to @var accountData
   * 
   */
  loadAccountData() {
    this.clientService.getAccountData(this.authService.selectedAccountNumber).subscribe((res: AccountResponse) => {
      this.accountData = res;
    })
  }

  /**
   * @summary Account transaction(deposit or withdrawal)
   * Account attributes account number, account type, overdraft, minimum balance and balance.
   * Form reset after form submission
   * Account balance is updated ased on transaction type(deposit or withdrawal)
   * @param amount amounto deposit or withdraw
   * @returns Navigate to accounts list page when the transaction is done
   */
  onSubmit(amount) {
    this.clientService.updateAccount(this.authService.selectedAccountNumber, {
      accountType: this.accountData.accountType,
      overdraft: this.accountData.overdraft,
      minBalance: this.accountData.minBalance,
      balance: this.accountBalanceUpdated(amount)
    })
      .subscribe(res => {
        this.router.navigate(["/account-list"]);
      });
  }

  /**
   * @summary accountBalanceUpdated function and  returns the updated account balance
   * Account balance is updated ased on transaction type(deposit or withdrawal)
   * @param transaction object (amount)
   * 
   */
  accountBalanceUpdated(transaction) {
    transaction.transactionAmount = parseInt(transaction.transactionAmount);
    if (transaction.transactionType == 'deposit') {
      return this.accountData.balance + transaction.transactionAmount;
    } else {
      return (this.accountData.balance > transaction.transactionAmount) ? (this.accountData.balance - transaction.transactionAmount) : 0;
    }
  }

  /**
   * @summary To show the loader untill we get account list data api response
   * 
   */
  async itsLoading(loading) {
    return await loading.present();
  }
}