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
};
