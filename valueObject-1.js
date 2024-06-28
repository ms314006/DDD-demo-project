class Money {

  #amount;

  constructor(amount) {
    this.#amount = amount;
  }

  get amount() {
    return this.#amount;
  }
}

console.log(`我有 ${new Money(100).amount} TWD`);
