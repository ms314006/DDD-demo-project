class Money {

  #amount;
  #currency;

  constructor(amount, currency) {
    this.#amount = amount;
    this.#currency = currency;
  }

  get amountString() {
    return `${this.#amount} ${this.#currency}`
  }
}

console.log(`我有 ${new Money(100, 'TWD').amountString}`);
