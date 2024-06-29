<script setup>
import { storeToRefs } from 'pinia';
import useBoardViewModel from './stores/useBoardViewModel';
import AccountRegisterForm from './components/AccountRegisterForm.vue';
import MissionSystem from './components/MissionSystem.vue';

const boardVewModel = useBoardViewModel();
const {
  handlePostMission,
  handleCancelMission,
  handleTakeMission,
  handleAbandonMission,
  handleSubmitFinishMission,
  handleFinishMission,
  handleRejectMission,
  handleRegisterAccount,
} = boardVewModel;

const {
  account,
  waitingForTakeMissions,
  missionsTaken,
  missionsIsTaken,
} = storeToRefs(boardVewModel);
</script>

<template>
  <div>
    <h1>接任務系統</h1>
    <div v-if="account">
      <MissionSystem
        :account="account"
        :waitingForTakeMissions="waitingForTakeMissions"
        :missionsTaken="missionsTaken"
        :missionsIsTaken="missionsIsTaken"
        :onPostMission="handlePostMission"
        :onCancelMission="handleCancelMission"
        :onTakeMission="handleTakeMission"
        :onAbandonMission="handleAbandonMission"
        :onSubmitFinishMission="handleSubmitFinishMission"
        :onFinishMission="handleFinishMission"
        :onRejectMission="handleRejectMission"
      />
    </div>
    <div v-else>
      <AccountRegisterForm
        :onRegisterAccount="handleRegisterAccount"
      />
    </div>
  </div>
</template>
