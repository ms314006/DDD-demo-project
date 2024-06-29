import DecreaseAccountBalancePolicy from '@/modules/board/valueObjects/DecreaseAccountBalancePolicy';

class Account {
  constructor(name, balance) {
    this.name = name;
    this.balance = balance;
  }

  get balanceAmount() {
    return this.balance.amount;
  }

  increaseBalance(amount) {
    this.balance = this.balance.increase(amount);
  }

  decreaseBalance(amount) {
    if (new DecreaseAccountBalancePolicy(this, amount).isAllow) {
      throw new Error('Have no enough balance amount.');
    }
    this.balance = this.balance.decrease(amount);
  }
}

export default Account;
