import { useState, useEffect } from "react";
import MissionsApplicationService from "@/app/modules/missions/application/MissionsApplicationService";
import MissionsQueryService from "@/app/modules/missions/application/MissionsQueryService";
import missionsRepository from "@/app/modules/missions/repositories";
import MissionService from "@/app/modules/missions/entities/MissionService";

const useMissionsViewModel = () => {
  const missionsApplicationService = new MissionsApplicationService(
    missionsRepository,
    new MissionsQueryService(),
    new MissionService(missionsRepository),
  )

  const [missions, setMissions] = useState([]);
  const setNewestMissions = async () => {
    setMissions(await missionsApplicationService.getMissions());
  }
  useEffect(() => {
    setNewestMissions();
  }, []);

  const [account, setAccount] = useState(null);

  return {
    account,
    missions,
    handlePostMission: async (missionToBePost) => {
      await missionsApplicationService.postMission(
        account.name,
        missionToBePost
      );
      setNewestMissions();
    },
    handleRegisterAccountByName: async (accountName) => {
      await missionsApplicationService
        .registerAccountByName(accountName);
      setAccount(
        await missionsApplicationService
          .getAccountByName(accountName)
      );
    }
  };
}

export default useMissionsViewModel;
