<script setup>
import CommandErrorFactory from '../modules/board/valueObjects/CommandErrorFactory';

const props = defineProps({
  missions: {
    type: Array,
    default: () => [],
  },
  onCancelMission: {
    type: Function,
    default: () => null,
  },
  onTakeMission: {
    type: Function,
    default: () => null,
  },
});

const handleTakeMission = async (missionId) => {
  try {
    await props.onTakeMission(missionId);
  } catch (e) {
    switch (e.message) {
      case CommandErrorFactory.getErrorMessages().NOT_ENOUGH_MONEY_TO_TAKE_MISSION:
        alert('擁有的金錢不足以支付接取任務的費用');
        break;
      default:
        alert('未知錯誤');
        break;
    }
  }
}
</script>

<template>
  <div>
    <h2>等待接取</h2>
    <table>
      <thead>
        <tr>
          <th>標題</th>
          <th>接取費用</th>
          <th>完成報酬</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="mission in props.missions" :key="mission.id">
          <td className="text-center">
            {{ mission.title }}
          </td>
          <td className="text-center">
            {{ mission.cost }}
          </td>
          <td className="text-center">
            {{ mission.reward }}
          </td>
          <td className="text-center">
            <button
              v-if="mission.isCancelable"
              className="mx-1"
              @click="() => onCancelMission(mission.id)"
            >
              撤銷
            </button>
            <button
              v-if="mission.isTakable"
              className="mx-1"
              @click="() => handleTakeMission(mission.id)"
            >
              接取
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
