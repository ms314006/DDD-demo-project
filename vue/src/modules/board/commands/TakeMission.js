import CommandErrorFactory from '@/modules/board/valueObjects/CommandErrorFactory';

class TakeMission {
  constructor(missionsRepository, accountRepository) {
    this.missionsRepository = missionsRepository;
    this.accountRepository = accountRepository;
  }

  async execute(accountName, missionId) {
    const mission = await this.missionsRepository
      .getMissionById(missionId);
    const account = await this.accountRepository
      .getAccountByName(accountName);
    if (account.balanceAmount < mission.costAmount) {
      CommandErrorFactory.throwNotEnoughMoneyToTakeMissionError();
    }
    mission.commitToTakenByAccount(account);
    const recipient = await this.accountRepository
      .getAccountByName(mission.recipient);
    const creator = await this.accountRepository
      .getAccountByName(mission.creator);
    recipient.decreaseBalance(mission.costAmount);
    creator.increaseBalance(mission.costAmount);

    await this.accountRepository.saveAccount(recipient);
    await this.accountRepository.saveAccount(creator);
    await this.missionsRepository.saveMission(mission);
  }
}

export default TakeMission;
