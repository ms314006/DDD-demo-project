import Account from '@/app/modules/missions/entities/Account';
import Money from '@/app/modules/missions/entities/Money';

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
