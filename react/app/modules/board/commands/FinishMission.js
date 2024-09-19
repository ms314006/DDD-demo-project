/**
 * FinishMission
 * @param {Object} missionsRepository
 * @param {function} missionsRepository.getMissionById
 * @param {function} missionsRepository.saveMission
 * @param {Object} accountRepository
 * @param {function} accountRepository.getAccountByName
 * @param {function} accountRepository.saveAccount
 */
class FinishMission {
  constructor(missionsRepository, accountRepository) {
    this.missionsRepository = missionsRepository;
    this.accountRepository = accountRepository;
  }

  async execute(missionId) {
    const mission = await this.missionsRepository
      .getMissionById(missionId);
    const recipient = await this.accountRepository
      .getAccountByName(mission.recipient);

    mission.commitToFinished();
    recipient.increaseBalance(mission.rewardAmount);

    await this.missionsRepository.saveMission(mission);
    await this.accountRepository.saveAccount(recipient);
  }
}

export default FinishMission;
