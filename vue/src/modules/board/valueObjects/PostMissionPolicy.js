class PostMissionPolicy {
  constructor(account, mission) {
    this.account = account;
    this.mission = mission;
  }

  get isEmptyTitle() {
    return this.mission.title.replaceAll(' ', '') === '';
  }

  get notEnoughMoneyToPayReward() {
    return this.account.balanceAmount < this.mission.rewardAmount
  }
}

export default PostMissionPolicy;
