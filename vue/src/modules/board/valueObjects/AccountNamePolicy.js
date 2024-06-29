class AccountNamePolicy {
  constructor(name) {
    this.name = name;
  }

  get isEmptyName() {
    return this.name.replaceAll(' ', '') === '';
  }

  get isAllowed() {
    return !this.isEmptyName;
  }
}

export default AccountNamePolicy;
