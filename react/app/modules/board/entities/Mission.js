class Mission {
  constructor(
    id,
    title,
    status,
    cost,
    reward,
  ) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.cost = cost;
    this.reward = reward;
  }

  static getStatuses() {
    return {
      WAITING_FOR_TAKE: 'WAITING_FOR_TAKE',
      TAKEN: 'TAKEN',
      FINISHED: 'FINISHED',
      CANCELED: 'CANCELED',
    };
  }

  get costAmount() {
    return this.cost.amount;
  }

  get rewardAmount() {
    return this.reward.amount;
  }
}

export default Mission;
