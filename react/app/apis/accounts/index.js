// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAccounts: async () => (
    JSON.parse(localStorage.getItem("accounts") || '[]')
  ),
  registerAccount: async (account) => (
    localStorage.setItem(
      "accounts",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("accounts") || '[]'),
        account,
      ]),
    )
  ),
  saveAccount: async (account) => {
    localStorage.setItem(
      "accounts",
      JSON.stringify(
        JSON.parse(localStorage.getItem("accounts") || '[]')
          .map((existAccount) => (
            existAccount.name === account.name
              ? account
              : existAccount
          )),
      ),
    )
  }
};
