class Money {
  constructor(amount) {
    this.amount = amount;
  }

  increase(amount) {
    return new Money(this.amount + amount);
  }

  decrease(amount) {
    return new Money(this.amount - amount);
  }
}

export default Money;
