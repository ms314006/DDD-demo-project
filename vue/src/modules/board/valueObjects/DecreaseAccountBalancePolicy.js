class DecreaseAccountBalancePolicy {
  constructor(account, decreaseAmount) {
    this.account = account;
    this.decreaseAmount = decreaseAmount;
  }

  get isAllow() {
    return this.account.balanceAmount < this.decreaseAmount;
  }
}

export default DecreaseAccountBalancePolicy;
