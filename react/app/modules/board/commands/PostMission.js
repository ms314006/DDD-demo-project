import MissionService from "@/app/modules/board/services/MissionService";

/**
 * PostMission
 * @param {Object} missionsRepository
 * @param {function} missionsRepository.getNextMissionIdentity
 * @param {function} missionsRepository.postMission
 * @param {Object} accountRepository
 * @param {function} accountRepository.getAccountByName
 */
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
