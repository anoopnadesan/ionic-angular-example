import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccountListPage } from './account-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([{
      path: '',
      component: AccountListPage
    }, {
      path: 'account-transaction',
      loadChildren: '../account-transaction/account-transaction.module#TransactionsPageModule'
    }])
  ],
  declarations: [AccountListPage]
})
export class AccountListPageModule { }
