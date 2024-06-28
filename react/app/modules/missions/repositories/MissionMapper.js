import Mission from '@/app/modules/missions/entities/Mission';
import Money from '@/app/modules/missions/entities/Money';

class MissionMapper {
  static toDomain(raw) {
    return new Mission(
      raw.id,
      raw.title,
      raw.status,
      new Money(raw.cost),
      new Money(raw.reward),
    );
  }
  
  static toPersistence(mission) {
    return {
      id: mission.id,
      title: mission.title,
      status: mission.status,
      cost: mission.costAmount,
      reward: mission.rewardAmount,
    };
  }
}

export default MissionMapper;
