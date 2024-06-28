class Account {
  constructor(name, money) {
    this.name = name;
    this.money = money;
  }

  get moneyAmount() {
    return this.money.amount;
  }
}

export default Account;
