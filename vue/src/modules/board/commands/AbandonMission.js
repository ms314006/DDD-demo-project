class AbandonMission {
  constructor(missionsRepository) {
    this.missionsRepository = missionsRepository;
  }

  async execute(missionId) {
    const mission = await this.missionsRepository
      .getMissionById(missionId);
    mission.commitToWaitingForTake();
    await this.missionsRepository.saveMission(mission);
  }
}

export default AbandonMission;
