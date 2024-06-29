class Money {
  constructor(amount) {
    this.amount = amount;
  }

  topUp(topUpAmount) {
    return new Money(this.amount + topUpAmount);
  }
}

export default Money;
