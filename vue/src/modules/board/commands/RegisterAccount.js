import Account from '@/modules/board/entities/Account';
import AccountNamePolicy from '@/modules/board/valueObjects/AccountNamePolicy';
import CommandErrorFactory from '@/modules/board/valueObjects/CommandErrorFactory';
import Money from '@/modules/board/valueObjects/Money';

class RegisterAccount {
  constructor(accountsRepository) {
    this.accountsRepository = accountsRepository;
  }

  async execute(name) {
    if (!new AccountNamePolicy(name).isAllowed) {
      CommandErrorFactory.throwInvalidAccountNameError();
    }
    const account = await this.accountsRepository.getAccountByName(name);
    if (account === null) {
      await this.accountsRepository
        .registerAccount(new Account(name, new Money(0)))
    };
  }
}

export default RegisterAccount;
