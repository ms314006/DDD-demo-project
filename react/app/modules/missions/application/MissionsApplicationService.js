import Account from '@/app/modules/missions/entities/Account';
import Money from '@/app/modules/missions/entities/Money';
import AccountNamePolicy from '@/app/modules/missions/entities/AccountNamePolicy';
import CommandErrorFactory from '@/app/modules/missions/application/CommandErrorFactory';

class MissionsApplicationService {
  constructor(
    missionsRepository,
    missionsQueryService,
    missionService,
  ) {
    this.missionsRepository = missionsRepository;
    this.missionsQueryService = missionsQueryService;
    this.missionService = missionService;
  }

  async registerAccountByName(name) {
    if (!new AccountNamePolicy(name).isAllowed) {
      CommandErrorFactory.throwInvalidAccountNameError();
    }

    const account = await this.missionsRepository.getAccountByName(name);

    if (account === -1) {
      await this.missionsRepository
        .registerAccount(new Account(name, new Money(0)))
    };
  }

  async getAccountByName(name) {
    return this.missionsQueryService.getAccountByName(name);
  }

  async getMissions() {
    return this.missionsQueryService.getMissions();
  }

  async postMission(accountName, missionToBePost) {
    const account = await this.missionsRepository.getAccountByName(accountName);
    const mission = this.missionService.getMissionToBePost(
      this.missionsRepository.getNextMissionIdentity(),
      missionToBePost.title,
      missionToBePost.cost,
      missionToBePost.reward,
    );

    const postedMission = await this.missionService.postMission(
      account,
      mission
    );
    return {
      id: postedMission.id,
      title: postedMission.title,
      cost: postedMission.costAmount,
      reward: postedMission.rewardAmount,
    };
  }
}

export default MissionsApplicationService;
