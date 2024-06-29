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

  getDisplayMissionStatus(missionStatus) {
    switch (missionStatus) {
      case Mission.getStatuses().TAKEN:
        return '執行中'
      case Mission.getStatuses().SUBMITTED_FINISH:
        return '等待確認中'
      case Mission.getStatuses().FINISHED:
        return '完成'
      default:
        return '';
    }
  };

  async getMissionsTakenByAccountName(accountName) {
    const missions = await missionsApis.getMissions();
    return missions
      .filter((mission) => (mission.recipient === accountName))
      .map((mission) => ({
        ...mission,
        status: this.getDisplayMissionStatus(mission.status),
        isControllable: mission.status === Mission.getStatuses().TAKEN
      }));
  }

  async getMissionsIsTakenByAccountName(accountName) {
    const missions = await missionsApis.getMissions();
    return missions
      .filter((mission) => (
        [
          Mission.getStatuses().TAKEN,
          Mission.getStatuses().SUBMITTED_FINISH,
          Mission.getStatuses().FINISHED,
        ].includes(mission.status)
        && mission.creator === accountName
      ))
      .map((mission) => ({
        ...mission,
        status: this.getDisplayMissionStatus(mission.status),
        isControllable: mission.status === Mission.getStatuses().SUBMITTED_FINISH
      }));
  }
}

export default BoardQueryService;
