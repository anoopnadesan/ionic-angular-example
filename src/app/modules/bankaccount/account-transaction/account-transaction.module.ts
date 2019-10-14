import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TransactionsPage } from './account-transaction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '',
      component: TransactionsPage
    }, {
      path: 'account-list', loadChildren: './modules/bankaccount/account-list/account-list.module#AccountListPageModule'
    }])
  ],
  declarations: [TransactionsPage]
})
export class TransactionsPageModule { }
