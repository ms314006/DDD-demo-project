class Money {
  constructor(amount) {
    this.amount = Number(amount);
  }

  increase(amount) {
    return new Money(this.amount + Number(amount));
  }

  decrease(amount) {
    return new Money(this.amount - Number(amount));
  }
}

export default Money;
