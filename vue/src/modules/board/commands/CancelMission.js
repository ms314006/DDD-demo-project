import CancelMissionCostCalculator from '@/modules/board/valueObjects/CancelMissionCostCalculator';

class CancelMission {
  constructor(missionsRepository, accountRepository) {
    this.missionsRepository = missionsRepository;
    this.accountRepository = accountRepository;
  }

  async execute(missionId) {
    const mission = await this.missionsRepository
      .getMissionById(missionId);
    mission.commitToCancel();

    const cancelMissionCost = new CancelMissionCostCalculator().value;
    const account = await this.accountRepository
      .getAccountByName(mission.creator);
    account.increaseBalance(mission.rewardAmount - cancelMissionCost);

    await this.missionsRepository.saveMission(mission);
    await this.accountRepository.saveAccount(account);
  }
}

export default CancelMission;
