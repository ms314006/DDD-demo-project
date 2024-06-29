// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getMissions: async () => (
    JSON.parse(localStorage.getItem("missions") || '[]')
  ),
  postMission: async (mission) => (
    localStorage.setItem(
      "missions",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("missions") || '[]'),
        mission,
      ]),
    )
  ),
  saveMissions: async (missions) => (
    localStorage.setItem(
      "missions",
      JSON.stringify(missions),
    )
  ),
};
