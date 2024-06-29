import domainEventPublisher from "@/app/modules/DomainEventPublisher";
import MissionTaken from "@/app/modules/board/domainEvents/MissionTaken";
import CommandErrorFactory from "@/app/modules/board/valueObjects/CommandErrorFactory";

class TakeMission {
  constructor(missionsRepository, accountRepository) {
    this.missionsRepository = missionsRepository;
    this.accountRepository = accountRepository;
  }

  async execute(accountName, missionId) {
    domainEventPublisher.reset();
    domainEventPublisher.subscribe(
      MissionTaken,
      this.onMissionTaken.bind(this),
    );

    const mission = await this.missionsRepository
      .getMissionById(missionId);
    const account = await this.accountRepository
      .getAccountByName(accountName);
    if (account.balanceAmount < mission.costAmount) {
      CommandErrorFactory.throwNotEnoughMoneyToTakeMissionError();
    }
    mission.commitToTakenByAccount(account);
    await this.missionsRepository.saveMission(mission);
  }

  async onMissionTaken(domainEvent) {
    const mission = await this.missionsRepository
      .getMissionById(domainEvent.missionId);
    const recipient = await this.accountRepository
      .getAccountByName(mission.recipient);
    const creator = await this.accountRepository
      .getAccountByName(mission.creator);
    recipient.decreaseBalance(mission.costAmount);
    creator.increaseBalance(mission.costAmount);
    await this.accountRepository.saveAccount(recipient);
    await this.accountRepository.saveAccount(creator);
  }
}

export default TakeMission;
