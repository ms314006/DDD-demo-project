class Account {
  constructor(name, balance) {
    this.name = name;
    this.balance = balance;
  }

  get balanceAmount() {
    return this.balance.amount;
  }

  topUpBalance(amount) {
    this.balance = this.balance.topUp(amount);
  }
}

export default Account;
