import MissionService from '@/modules/board/services/MissionService';

class PostMission {
  constructor(missionsRepository, accountRepository) {
    this.missionService = new MissionService(
      missionsRepository,
      accountRepository,
    );
    this.missionsRepository = missionsRepository;
    this.accountRepository = accountRepository;
  }

  async execute(accountName, missionToBePost) {
    const account = await this.accountRepository.getAccountByName(accountName);
    const mission = this.missionService.getMissionToBePost(
      this.missionsRepository.getNextMissionIdentity(),
      missionToBePost.title,
      missionToBePost.cost,
      missionToBePost.reward,
      account.name,
    );
    await this.missionService.postMission(account, mission);
  }
}

export default PostMission;
