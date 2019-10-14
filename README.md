# Sample mobile app with ionic angular
Bank account listing, new account opening and transactions.

### Set up
run `npm install` to install the project dependencies.
run `ionic serve` to run the project locally.

### The API
The API’s are based on firebase email authentication as well as REST access to the Firebase Realtime database.

### Accounts listing
List of accounts with account number, balance amount, account type, overdraft and transaction link.

### Create account
Open new account should post a new account object to the accounts collection and linked to the logged in user.
```
## New account object

``{
      accountNumer: this.item.accountNumer,
      overdraft: this.item.overdraft,
      minBalance: this.item.minBalance,
      balance: this.item.accountBalanceUpdated(value),
      accountType: this.accountType
    }
```

### Deposit and withdrawal transactions
Deposits and withdrawals should update the accounts balance.