import MissionService from '../entities/MissionService';

class PostMission {
  constructor(missionsRepository) {
    this.missionsRepository = missionsRepository;
  }

  async execute(mission) {
    return await new MissionService(this.missionsRepository)
      .postMission(mission);
  }
}

export default PostMission;
