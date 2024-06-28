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
};
