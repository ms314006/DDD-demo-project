import MissionService from "@/app/modules/board/services/MissionService";

class FinishMission {
  constructor(missionsRepository, accountRepository) {
    this.missionService = new MissionService(
      missionsRepository,
      accountRepository,
    );
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
