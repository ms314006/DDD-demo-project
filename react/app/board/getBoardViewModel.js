import { useState } from "react";
import BoardQueryService from "@/app/modules/board/BoardQueryService";
import AccountRepository from "@/app/modules/board/repositories/AccountRepository";
import MissionRepository from "@/app/modules/board/repositories/MissionRepository";
import PostMission from "@/app/modules/board/commands/PostMission";
import CancelMission from "@/app/modules/board/commands/CancelMission";
import RegisterAccount from "@/app/modules/board/commands/RegisterAccount";

const useMissionsViewModel = (
  boardQueryService,
  postMission,
  cancelMission,
  registerAccount,
) => {
  const [account, setAccount] = useState(null);
  const [missions, setMissions] = useState([]);
  const refetchViewInfo = async () => {
    setMissions(
      await boardQueryService
        .getShowedMissionsOnBoardByAccountName(account.name)
    );
    setAccount(
      await boardQueryService.getAccountByName(account.name)
    );
  }

  return {
    account,
    missions,
    handlePostMission: async (missionToBePost) => {
      await postMission.execute(account.name, missionToBePost);
      refetchViewInfo();
    },
    handleCancelMission: async (missionId) => {
      await cancelMission.execute(missionId);
      refetchViewInfo();
    },
    handleRegisterAccount: async (accountName) => {
      await registerAccount.execute(accountName);
      setAccount(await boardQueryService.getAccountByName(accountName));
      setMissions(
        await boardQueryService
          .getShowedMissionsOnBoardByAccountName(accountName)
      )
    }
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => useMissionsViewModel(
  new BoardQueryService(),
  new PostMission(new MissionRepository(), new AccountRepository()),
  new CancelMission(new MissionRepository(), new AccountRepository()),
  new RegisterAccount(new AccountRepository()),
);
