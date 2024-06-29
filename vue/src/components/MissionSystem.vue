<script setup>
import { ref } from 'vue';
import MissionForm from './MissionForm.vue';
import WaitingForTakeMissionTable from './WaitingForTakeMissionTable.vue';
import MissionTakenTable from './MissionTakenTable.vue';
import MissionIsTakenTable from './MissionIsTakenTable.vue';

const props = defineProps({
  account: {
    type: { name: String, balance: Number },
    default: { name: '', balance: NaN },
  },
  waitingForTakeMissions: { type: Array, default: () => [] },
  missionsTaken: { type: Array, default: () => [] },
  missionsIsTaken: { type: Array, default: () => [] },
  onPostMission: { type: Function, default: () => null },
  onCancelMission: { type: Function, default: () => null },
  onTakeMission: { type: Function, default: () => null },
  onAbandonMission: { type: Function, default: () => null },
  onSubmitFinishMission: { type: Function, default: () => null },
  onFinishMission: { type: Function, default: () => null },
  onRejectMission: { type: Function, default: () => null }
});

const postMissionFormVisible = ref(false);
const openPostMissionForm = () => postMissionFormVisible.value = true;
const closePostMissionForm = () => postMissionFormVisible.value = false;

</script>

<template>
  <div>
    <div>
      <p>{{ `使用者：${props.account.name}` }}</p>
      <p>{{ `金錢：${props.account.balance}` }}</p>
    </div>
    <div v-if="postMissionFormVisible">
      <MissionForm
        :onConfirm="onPostMission"
        :onCancel="closePostMissionForm"
      />
    </div>
    <div v-else>
      <button @click="openPostMissionForm">
        張貼任務
      </button>
    </div>
    <div className="mt-4">
      <WaitingForTakeMissionTable
        :missions="props.waitingForTakeMissions"
        :onCancelMission="onCancelMission"
        :onTakeMission="onTakeMission"
      />
    </div>
    <div className="mt-4">
      <MissionTakenTable
        :missions="props.missionsTaken"
        :onAbandonMission="onAbandonMission"
        :onSubmitFinishMission="onSubmitFinishMission"
      />
    </div>
    <div className="mt-4">
      <MissionIsTakenTable
        :missions="props.missionsIsTaken"
        :onRejectMission="onRejectMission"
        :onFinishMission="onFinishMission"
      />
    </div>
  </div>
</template>
