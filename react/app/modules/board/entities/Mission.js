class Mission {
  constructor(
    id,
    title,
    status,
    cost,
    reward,
    creator,
    recipient,
  ) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.cost = cost;
    this.reward = reward;
    this.creator = creator;
    this.recipient = recipient;
  }

  static getStatuses() {
    return {
      WAITING_FOR_TAKE: 'WAITING_FOR_TAKE',
      TAKEN: 'TAKEN',
      FINISHED: 'FINISHED',
      CANCELED: 'CANCELED',
      SUBMITTED_FINISH: 'SUBMITTED_FINISH',
    };
  }

  get costAmount() {
    return this.cost.amount;
  }

  get rewardAmount() {
    return this.reward.amount;
  }

  commitToCancel() {
    this.status = Mission.getStatuses().CANCELED;
  }

  commitToTakenByAccount(account) {
    this.status = Mission.getStatuses().TAKEN;
    this.recipient = account.name;
  }

  commitToWaitingForTake() {
    this.status = Mission.getStatuses().WAITING_FOR_TAKE;
    this.recipient = null;
  }

  commitToSubmitFinish() {
    this.status = Mission.getStatuses().SUBMITTED_FINISH;
  }

  commitToFinished() {
    this.status = Mission.getStatuses().FINISHED;
  }

  commitToRejected() {
    this.status = Mission.getStatuses().TAKEN;
  }
}

export default Mission;
