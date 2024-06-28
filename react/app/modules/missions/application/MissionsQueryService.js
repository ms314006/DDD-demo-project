import missionsApis from "@/app/apis/missions";
import accountsApis from "@/app/apis/accounts";

class MissionsQueryService {
  async getAccountByName(accountName) {
    const accounts = await accountsApis.getAccounts();
    return accounts.find(({ name }) => name === accountName);
  }

  async getMissions() {
    return await missionsApis.getMissions();
  }
}

export default MissionsQueryService;
