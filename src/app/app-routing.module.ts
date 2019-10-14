import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 

/**
 * App routes list(sign in, new account, account list and transaction)
 *  
 */
const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', loadChildren: './modules/auth/signin/signin.module#SigninPageModule' },
  { path: 'account-list', loadChildren: './modules/bankaccount/account-list/account-list.module#AccountListPageModule' },
  { path: 'account-new', loadChildren: './modules/bankaccount/account-new/account-new.module#AccountNewPageModule' },
  { path: 'account-transaction/:id', loadChildren: './modules/bankaccount/account-transaction/account-transaction.module#TransactionsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
