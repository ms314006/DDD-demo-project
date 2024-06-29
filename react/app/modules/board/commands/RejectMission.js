class RejectMission {
  constructor(missionsRepository) {
    this.missionsRepository = missionsRepository;
  }

  async execute(missionId) {
    const mission = await this.missionsRepository
      .getMissionById(missionId);

    mission.commitToRejected();

    await this.missionsRepository.saveMission(mission);
  }
}

export default RejectMission;
