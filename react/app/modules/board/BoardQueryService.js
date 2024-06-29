import missionsApis from "@/app/apis/missions";
import accountsApis from "@/app/apis/accounts";
import Mission from "@/app/modules/board/entities/Mission";

class BoardQueryService {
  async getAccountByName(accountName) {
    const accounts = await accountsApis.getAccounts();
    return accounts.find(({ name }) => name === accountName);
  }

  async getWaitingForTakeMissionsByAccountName(accountName) {
    const missions = await missionsApis.getMissions();
    return missions
      .filter((mission) => (
        mission.status === Mission.getStatuses().WAITING_FOR_TAKE
      ))
      .map((mission) => ({
        ...mission,
        isCancelable: mission.creator === accountName,
        isTakable: mission.creator !== accountName,
      }));
  }

  async getMissionsTakenByAccountName(accountName) {
    const missions = await missionsApis.getMissions();
    return missions
      .filter((mission) => (mission.recipient === accountName))
      .map((mission) => ({
        ...mission,
        status: mission.status === Mission.getStatuses().SUBMITTED_FINISH
          ? '確認結果中'
          : '任務執行中',
        isControllable: mission.status === Mission.getStatuses().TAKEN
      }));
  }
}

export default BoardQueryService;
