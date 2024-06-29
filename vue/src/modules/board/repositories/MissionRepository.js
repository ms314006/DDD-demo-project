import missionsApis from '@/apis/missions';
import MissionMapper from '@/modules/board/repositories/MissionMapper';

class MissionRepository {
  getNextMissionIdentity() {
    return Math.random();
  }

  async postMission(mission) {
    const persistedMission = MissionMapper.toPersistence(mission);
    await missionsApis.postMission(persistedMission);
    return MissionMapper.toDomain(persistedMission);
  }

  async getMissions() {
    const missions = await missionsApis.getMissions();
    return missions.map((mission) => (MissionMapper.toDomain(mission)))
  }

  async getMissionById(missionId) {
    const missions = await missionsApis.getMissions();
    const mission = missions
      .map((mission) => (MissionMapper.toDomain(mission)))
      .find((mission) => mission.id === missionId)
    if (mission) return mission;
    return null;
  }

  async saveMission(mission) {
    const savePersistedMission = MissionMapper.toPersistence(mission);
    const missions = await missionsApis.getMissions();
    return missionsApis.saveMissions(
      missions.map((existMission) => (
        existMission.id === savePersistedMission.id
          ? savePersistedMission
          : existMission
      ))
    );
  }
};

export default MissionRepository;

