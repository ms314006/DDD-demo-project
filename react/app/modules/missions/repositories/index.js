import missionsApis from '@/app/apis/missions';
import accountsApis from '@/app/apis/accounts';
import MissionMapper from '@/app/modules/missions/repositories/MissionMapper';
import AccountsMapper from '@/app/modules/missions/repositories/AccountsMapper';

export default {
  getNextMissionIdentity: () => Math.random(),
  postMission: async (mission) => {
    const persistedMission = MissionMapper.toPersistence(mission);
    await missionsApis.postMission(persistedMission);
    return MissionMapper.toDomain(persistedMission);
  },
  getMissions: async () => {
    const missions = await missionsApis.getMissions()
    return missions.map((mission) => (MissionMapper.toDomain(mission)))
  },
  getAccountByName: async (accountName) => {
    const accounts = await  accountsApis.getAccounts();
    const account = accounts
      .find(({ name }) => name === accountName);
    if (account) {
      return AccountsMapper.toDomain(account);
    }
    return -1;
  },
  registerAccount: async (account) => {
    const persistedAccount = AccountsMapper.toPersistence(account);
    await accountsApis.registerAccount(persistedAccount);
    return AccountsMapper.toDomain(persistedAccount);
  },
};
