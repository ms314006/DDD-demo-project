import accountsApis from '@/apis/accounts';
import AccountsMapper from '@/modules/board/repositories/AccountsMapper';

class AccountRepository {
  async getAccountByName(accountName) {
    const accounts = await  accountsApis.getAccounts();
    const account = accounts
      .find(({ name }) => name === accountName);
    if (account) {
      return AccountsMapper.toDomain(account);
    }
    return null;
  }

  async registerAccount(account) {
    const persistedAccount = AccountsMapper.toPersistence(account);
    await accountsApis.registerAccount(persistedAccount);
    return AccountsMapper.toDomain(persistedAccount);
  }

  async saveAccount(account) {
    const persistedAccount = AccountsMapper.toPersistence(account);
    await accountsApis.saveAccount(persistedAccount);
  }
};

export default AccountRepository;
