import { ref } from 'vue'
import { defineStore } from 'pinia'
import BoardQueryService from '@/modules/board/BoardQueryService';
import AccountRepository from '@/modules/board/repositories/AccountRepository';
import MissionRepository from '@/modules/board/repositories/MissionRepository';
import PostMission from '@/modules/board/commands/PostMission';
import CancelMission from '@/modules/board/commands/CancelMission';
import TakeMission from '@/modules/board/commands/TakeMission';
import AbandonMission from '@/modules/board/commands/AbandonMission';
import SubmitFinishMission from '@/modules/board/commands/SubmitFinishMission';
import FinishMission from '@/modules/board/commands/FinishMission';
import RejectMission from '@/modules/board/commands/RejectMission';
import RegisterAccount from "@/modules/board/commands/RegisterAccount";

const useBoardViewModel = defineStore('boardViewModel', () => {
  const boardQueryService = new BoardQueryService();
  const accountRepository = new AccountRepository();
  const missionRepository = new MissionRepository();
  const postMission = new PostMission(missionRepository, accountRepository);
  const cancelMission = new CancelMission(missionRepository, accountRepository);
  const takeMission = new TakeMission(missionRepository, accountRepository);
  const abandonMission = new AbandonMission(missionRepository);
  const submitFinishMission = new SubmitFinishMission(missionRepository);
  const finishMission = new FinishMission(missionRepository, accountRepository);
  const rejectMission = new RejectMission(missionRepository);
  const registerAccount = new RegisterAccount(accountRepository);

  const account = ref(null);
  const waitingForTakeMissions = ref([]);
  const missionsTaken = ref([]);
  const missionsIsTaken = ref([]);
  const refetchMissions = async (accountName = account.value.name) => {
    waitingForTakeMissions.value = (
      await boardQueryService
        .getWaitingForTakeMissionsByAccountName(accountName)
    );
    missionsTaken.value = (
      await boardQueryService
        .getMissionsTakenByAccountName(accountName)
    );
    missionsIsTaken.value = (
      await boardQueryService
        .getMissionsIsTakenByAccountName(accountName)
    );
  }

  const refetchViewInfo = async () => {
    account.value = await boardQueryService
      .getAccountByName(account.value.name);
    refetchMissions();
  }

  return {
    account,
    waitingForTakeMissions: waitingForTakeMissions,
    missionsTaken,
    missionsIsTaken,
    handlePostMission: async (missionToBePost) => {
      await postMission.execute(account.value.name, missionToBePost);
      refetchViewInfo();
    },
    handleCancelMission: async (missionId) => {
      await cancelMission.execute(missionId);
      refetchViewInfo();
    },
    handleTakeMission: async (missionId) => {
      await takeMission.execute(account.value.name, missionId);
      refetchViewInfo();
    },
    handleAbandonMission: async (missionId) => {
      await abandonMission.execute(missionId);
      refetchViewInfo();
    },
    handleSubmitFinishMission: async (missionId) => {
      await submitFinishMission.execute(missionId);
      refetchViewInfo();
    },
    handleFinishMission: async (missionId) => {
      await finishMission.execute(missionId);
      refetchViewInfo();
    },
    handleRejectMission: async (missionId) => {
      await rejectMission.execute(missionId);
      refetchViewInfo();
    },
    handleRegisterAccount: async (accountName) => {
      await registerAccount.execute(accountName);
      account.value = await boardQueryService
        .getAccountByName(accountName);
      refetchMissions();
    },
  }
});

export default useBoardViewModel;
