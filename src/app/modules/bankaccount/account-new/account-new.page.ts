import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';

import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-account-new',
  templateUrl: './account-new.page.html',
  styleUrls: ['./account-new.page.scss'],
})
export class AccountNewPage implements OnInit {
  /**
   * @summary
   * New account creation page 
   * Form group instance object to hold all account transaction form
   */
  form: FormGroup;
  toast: any;

  constructor(
    public router: Router,
    public toastController: ToastController,
    private formBuilder: FormBuilder,
    private clientService: ClientService
  ) { }

  ngOnInit() {
    /**
     * @summary
     * Form reset initially on new account creation form
     */
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
      accountType: new FormControl('', Validators.required),
      overdraft: new FormControl('', Validators.required),
      minBalance: new FormControl('', Validators.required)
    });
  }

  /**
   * @summary new account creation data submission
   * Form reset after form submission
   * Navigate to accounts list page after successful account creation(data submission successful)
   * @params account number, overdraft, minimum balance and balance
   * @returns account details account number, overdraft, minimum balance and balance
   */
  onSubmit(value) {
    let accountNumber = Math.round(new Date().getTime() / 100);
    let accountData = {
      accountType: value.accountType,
      overdraft: value.overdraft,
      minBalance: value.minBalance,
      balance: value.minBalance
    };
    this.clientService.updateClient(accountNumber)
      .subscribe(res => {
        this.clientService.updateAccount(accountNumber, accountData).subscribe(data => {
          this.showToast(accountNumber, accountData);
          this.resetFields();
          this.router.navigate(["/account-list"]);
        });
      });
  }

  /**
   * @summary function to show toast message on successful account creation
   * Toast message format ACCOUNT_NUMBER account is created. Account number is ACCOUNT_NUMBER
   * 
   */
  showToast(accountNumber, accountData) {
    this.toast = this.toastController.create({
      message: accountData.accountType.toUpperCase() + ' account is created. Account number is ' + accountNumber,
      duration: 5000,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'OK',
      animated: true
    }).then((toastData) => {
      toastData.present();
    });
  }
}
