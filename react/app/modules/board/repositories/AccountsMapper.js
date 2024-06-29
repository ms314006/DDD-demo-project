import Account from '@/app/modules/board/entities/Account';
import Money from '@/app/modules/board/valueObjects/Money';

class AccountsMapper {
  static toDomain(raw) {
    return new Account(
      raw.name,
      new Money(raw.money),
    );
  }
  
  static toPersistence(account) {
    return {
      name: account.name,
      money: account.moneyAmount,
    };
  }
}

export default AccountsMapper;
