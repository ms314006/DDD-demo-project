import Account from "@/app/modules/board/entities/Account";
import AccountNamePolicy from "@/app/modules/board/valueObjects/AccountNamePolicy";
import CommandErrorFactory from "@/app/modules/board/valueObjects/CommandErrorFactory";
import Money from "@/app/modules/board/valueObjects/Money";

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
