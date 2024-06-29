import missionsApis from '@/app/apis/missions';
import MissionMapper from '@/app/modules/board/repositories/MissionMapper';

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
};

export default MissionRepository;

