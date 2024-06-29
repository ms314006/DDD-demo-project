const MissionTable = ({
  missions,
  onCancelMission,
  onTakeMission,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>標題</th>
          <th>接取費用</th>
          <th>完成報酬</th>
          <th>操作</th>
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
              <td className="text-center">
                {
                  mission.isCancelable && (
                    <button
                      className="mx-1"
                      onClick={() => onCancelMission(mission.id)}
                    >
                      撤銷
                    </button>
                  )
                }
                {
                  mission.isTakable && (
                    <button
                      className="mx-1"
                      onClick={() => onTakeMission(mission.id)}
                    >
                      接取
                    </button>
                  )
                }
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

export default MissionTable;
