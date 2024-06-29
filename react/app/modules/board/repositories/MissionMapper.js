import Mission from '@/app/modules/board/entities/Mission';
import Money from '@/app/modules/board/valueObjects/Money';

class MissionMapper {
  static toDomain(raw) {
    return new Mission(
      raw.id,
      raw.title,
      raw.status,
      new Money(raw.cost),
      new Money(raw.reward),
      raw.creator,
    );
  }
  
  static toPersistence(mission) {
    return {
      id: mission.id,
      title: mission.title,
      status: mission.status,
      cost: mission.costAmount,
      reward: mission.rewardAmount,
      creator: mission.creator,
    };
  }
}

export default MissionMapper;
