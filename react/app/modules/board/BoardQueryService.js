import missionsApis from "@/app/apis/missions";
import accountsApis from "@/app/apis/accounts";

class BoardQueryService {
  async getAccountByName(accountName) {
    const accounts = await accountsApis.getAccounts();
    return accounts.find(({ name }) => name === accountName);
  }

  async getMissions() {
    return missionsApis.getMissions();
  }
}

export default BoardQueryService;
