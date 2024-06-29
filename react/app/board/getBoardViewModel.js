import { useState } from "react";
import BoardQueryService from "@/app/modules/board/BoardQueryService";
import AccountRepository from "@/app/modules/board/repositories/AccountRepository";
import MissionRepository from "@/app/modules/board/repositories/MissionRepository";
import PostMission from "@/app/modules/board/commands/PostMission";
import CancelMission from "@/app/modules/board/commands/CancelMission";
import TakeMission from "@/app/modules/board/commands/TakeMission";
import RegisterAccount from "@/app/modules/board/commands/RegisterAccount";

const useMissionsViewModel = (
  boardQueryService,
  postMission,
  cancelMission,
  takeMission,
  registerAccount,
) => {
  const [account, setAccount] = useState(null);
  const [waitingForTakeMissions, setWaitingForTakeMissions] = useState([]);
  const [missionsTaken, setMissionsTaken] = useState([]);
  const refetchMissions = async (accountName = account.name) => {
    setWaitingForTakeMissions(
      await boardQueryService
        .getWaitingForTakeMissionsByAccountName(accountName)
    );
    setMissionsTaken(
      await boardQueryService
        .getMissionsTakenByAccountName(accountName)
    );
  }
  const refetchViewInfo = async () => {
    setAccount(
      await boardQueryService.getAccountByName(account.name)
    );
  }

  return {
    account,
    waitingForTakeMissions: waitingForTakeMissions,
    missionsTaken: missionsTaken,
    alreadyTakenMissions: [],
    handlePostMission: async (missionToBePost) => {
      await postMission.execute(account.name, missionToBePost);
      refetchViewInfo();
    },
    handleCancelMission: async (missionId) => {
      await cancelMission.execute(missionId);
      refetchViewInfo();
    },
    handleTakeMission: async (missionId) => {
      await takeMission.execute(account.name, missionId);
      refetchViewInfo();
    },
    handleRegisterAccount: async (accountName) => {
      await registerAccount.execute(accountName);
      setAccount(await boardQueryService.getAccountByName(accountName));
      refetchMissions(accountName);
    }
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => useMissionsViewModel(
  new BoardQueryService(),
  new PostMission(new MissionRepository(), new AccountRepository()),
  new CancelMission(new MissionRepository(), new AccountRepository()),
  new TakeMission(new MissionRepository(), new AccountRepository()),
  new RegisterAccount(new AccountRepository()),
);
