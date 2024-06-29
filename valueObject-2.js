class ATM {

  #money;

  constructor() {
    this.#money = new Money(0);
  }

  get amount() {
    return this.#money.amount;
  }

  withdraw(amount) {
    if (amount > this.#money.amount) {
      throw new Error('Insufficient balance');
    };

    this.#money = new Money(this.#money.amount - amount);
    return new Money(amount)
  }

  deposit(money) {
    this.#money = new Money(this.#money.amount + money.amount);
  }
}
