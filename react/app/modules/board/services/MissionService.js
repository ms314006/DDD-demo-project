import Mission from '@/app/modules/board/entities/Mission';
import Money from '@/app/modules/board/valueObjects/Money';
import PostMissionPolicy from '@/app/modules/board/valueObjects/PostMissionPolicy';
import CommandErrorFactory from '@/app/modules/board/valueObjects/CommandErrorFactory';

class MissionService {
  constructor(missionsRepository, accountRepository) {
    this.missionsRepository = missionsRepository;
    this.accountRepository = accountRepository;
  }

  async postMission(account, mission) {
    const postMissionPolicy = new PostMissionPolicy(account, mission);
    if (postMissionPolicy.notEnoughMoneyToPayReward) {
      CommandErrorFactory.throwNotEnoughMoneyToPayRewardError();
    }
    if (postMissionPolicy.isEmptyTitle) {
      CommandErrorFactory.throwInvalidMissionTitleError();
    }

    account.decreaseBalance(mission.rewardAmount);
    await this.accountRepository.saveAccount(account);
    const postedMission = await this.missionsRepository
      .postMission(mission);
    return postedMission;
  }

  getMissionToBePost(id, title, cost, reward, creator) {
    return new Mission(
      id,
      title,
      Mission.getStatuses().WAITING_FOR_TAKE,
      new Money(cost),
      new Money(reward),
      creator,
    );
  }
}

export default MissionService;
