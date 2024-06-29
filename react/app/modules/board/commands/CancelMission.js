import domainEventPublisher from "@/app/modules/DomainEventPublisher";
import MissionCanceled from "@/app/modules/board/domainEvents/MissionCanceled";
import CancelMissionCostCalculator from "@/app/modules/board/valueObjects/CancelMissionCostCalculator";

class CancelMission {
  constructor(missionsRepository, accountRepository) {
    this.missionsRepository = missionsRepository;
    this.accountRepository = accountRepository;
  }

  async execute(missionId) {
    domainEventPublisher.reset();
    domainEventPublisher.subscribe(
      MissionCanceled,
      this.onMissionCanceled.bind(this),
    );

    const mission = await this.missionsRepository
      .getMissionById(missionId);
    mission.commitToCancel();
    await this.missionsRepository.saveMission(mission);
  }

  async onMissionCanceled(domainEvent) {
    const mission = await this.missionsRepository
      .getMissionById(domainEvent.missionId);
    const cancelMissionCost = new CancelMissionCostCalculator().value;
    const account = await this.accountRepository
      .getAccountByName(mission.creator);
    account.topUpBalance(mission.rewardAmount - cancelMissionCost);
    await this.accountRepository.saveAccount(account);
  }
}

export default CancelMission;
