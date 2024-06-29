class SubmitFinishMission {
  constructor(missionsRepository) {
    this.missionsRepository = missionsRepository;
  }

  async execute(missionId) {
    const mission = await this.missionsRepository
      .getMissionById(missionId);
    mission.commitToSubmitFinish();
    await this.missionsRepository.saveMission(mission);
  }
}

export default SubmitFinishMission;
