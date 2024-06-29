<script setup>
const props = defineProps({
  missions: {
    type: Array,
    default: () => [],
  },
  onRejectMission: {
    type: Function,
    default: () => null,
  },
  onFinishMission: {
    type: Function,
    default: () => null,
  },
});
</script>

<template>
  <div>
    <h2>被接取的任務</h2>
    <table>
      <thead>
        <tr>
          <th>標題</th>
          <th>接取費用</th>
          <th>完成報酬</th>
          <th>狀態</th>
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
            {{ mission.status }}
          </td>
          <td className="text-center">
            <button
              className="mx-1"
              :disabled="!mission.isControllable"
              @click="() => onRejectMission(mission.id)"
            >
              拒絕
            </button>
            <button
              className="mx-1"
              :disabled="!mission.isControllable"
              @click="() => onFinishMission(mission.id)"
            >
              確認完成
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
