import domainEventPublisher from "@/app/modules/DomainEventPublisher";
import MissionTaken from "@/app/modules/board/domainEvents/MissionTaken";

class TakeMission {
  constructor(missionsRepository, accountRepository) {
    this.missionsRepository = missionsRepository;
    this.accountRepository = accountRepository;
  }

  async execute(account, missionId) {
    domainEventPublisher.reset();
    domainEventPublisher.subscribe(
      MissionTaken,
      this.onMissionTaken.bind(this),
    );

    const mission = await this.missionsRepository
      .getMissionById(missionId);
    mission.commitToTakenByAccount(account);
    await this.missionsRepository.saveMission(mission);
  }

  async onMissionTaken(domainEvent) {
    const mission = await this.missionsRepository
      .getMissionById(domainEvent.missionId);
    const account = await this.accountRepository
      .getAccountByName(mission.recipient);
    account.decreaseBalance(mission.costAmount);
    await this.accountRepository.saveAccount(account);
  }
}

export default TakeMission;
