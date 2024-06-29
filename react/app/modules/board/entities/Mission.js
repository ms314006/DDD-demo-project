import domainEventPublisher from "@/app/modules/DomainEventPublisher";
import MissionCanceled from "@/app/modules/board/domainEvents/MissionCanceled";

class Mission {
  constructor(
    id,
    title,
    status,
    cost,
    reward,
    creator,
  ) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.cost = cost;
    this.reward = reward;
    this.creator = creator;
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

  commitToCancel() {
    this.status = Mission.getStatuses().CANCELED;
    domainEventPublisher.publish(
      new MissionCanceled(this.id)
    );
  }
}

export default Mission;
