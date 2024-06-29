import Account from '@/modules/board/entities/Account';
import Money from '@/modules/board/valueObjects/Money';

class AccountsMapper {
  static toDomain(raw) {
    return new Account(
      raw.name,
      new Money(raw.balance),
    );
  }
  
  static toPersistence(account) {
    return {
      name: account.name,
      balance: account.balanceAmount,
    };
  }
}

export default AccountsMapper;
