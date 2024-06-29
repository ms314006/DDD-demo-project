const MissionTable = ({ missions }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>標題</th>
          <th>接取費用</th>
          <th>完成報酬</th>
        </tr>
      </thead>
      <tbody>
        {
          missions.map((mission) => (
            <tr key={mission.id}>
              <td className="text-center">
                { mission.title }
              </td>
              <td className="text-center">
                { mission.cost }
              </td>
              <td className="text-center">
                { mission.reward }
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

export default MissionTable;
