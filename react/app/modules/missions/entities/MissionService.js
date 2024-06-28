import CommandErrorFactory from '@/app/modules/missions/application/CommandErrorFactory';
import PostMissionPolicy from '@/app/modules/missions/entities/PostMissionPolicy';
import Mission from '@/app/modules/missions/entities/Mission';
import Money from '@/app/modules/missions/entities/Money';

class MissionService {
  constructor(missionsRepository) {
    this.missionsRepository = missionsRepository;
  }

  async postMission(account, mission) {
    const postMissionPolicy = new PostMissionPolicy(account, mission);
    if (postMissionPolicy.notEnoughMoneyToPayReward) {
      CommandErrorFactory.throwNotEnoughMoneyToPayRewardError();
    }
    if (postMissionPolicy.isEmptyTitle) {
      CommandErrorFactory.throwInvalidMissionTitleError();
    }
  
    const postedMission = await this.missionsRepository
      .postMission(mission);
    return postedMission;
  }

  getMissionToBePost(id, title, cost, reward) {
    return new Mission(
      id,
      title,
      Mission.getStatuses().WAITING_FOR_TAKE,
      new Money(cost),
      new Money(reward),
    );
  }
}

export default MissionService;
