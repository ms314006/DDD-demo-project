class AccountNamePolicy {
  constructor(account, mission) {
    this.account = account;
    this.mission = mission;
  }

  get isEmptyTitle() {
    return this.mission.title.replaceAll(' ', '') === '';
  }

  get notEnoughMoneyToPayReward() {
    return this.account.moneyAmount < this.mission.rewardAmount
  }
}

export default AccountNamePolicy;
