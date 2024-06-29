class Account {
  constructor(name, money) {
    this.name = name;
    this.money = money;
  }

  get moneyAmount() {
    return this.money.amount;
  }

  topUpBalance(amount) {
    this.money = this.money.topUp(amount);
  }
}

export default Account;
