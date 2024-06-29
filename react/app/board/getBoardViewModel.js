import { useState, useEffect } from "react";
import BoardQueryService from "@/app/modules/board/BoardQueryService";
import AccountRepository from "@/app/modules/board/repositories/AccountRepository";
import MissionRepository from "@/app/modules/board/repositories/MissionRepository";
import PostMission from "@/app/modules/board/commands/PostMission";
import RegisterAccountByName from "@/app/modules/board/commands/RegisterAccountByName";

const useMissionsViewModel = (
  boardQueryService,
  postMission,
  registerAccountByName,
) => {
  const [missions, setMissions] = useState([]);
  const setNewestMissions = async () => {
    setMissions(await boardQueryService.getMissions());
  }
  useEffect(() => {
    setNewestMissions();
  }, []);

  const [account, setAccount] = useState(null);

  return {
    account,
    missions,
    handlePostMission: async (missionToBePost) => {
      await postMission.execute(account.name, missionToBePost);
      setNewestMissions();
    },
    handleRegisterAccountByName: async (accountName) => {
      await registerAccountByName.execute(accountName);
      setAccount(
        await boardQueryService.getAccountByName(accountName)
      );
    }
  };
}

export default () => useMissionsViewModel(
  new BoardQueryService(),
  new PostMission(new MissionRepository(), new AccountRepository()),
  new RegisterAccountByName(new AccountRepository()),
);
