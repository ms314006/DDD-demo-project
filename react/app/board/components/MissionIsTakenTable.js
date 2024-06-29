const MissionIsTakenTable = ({
  missions,
  onRejectMission,
  onFinishMission,
}) => {
  return (
    <div>
      <h2>被接取的任務</h2>
      <table>
        <thead>
          <tr>
            <th>標題</th>
            <th>接取費用</th>
            <th>完成報酬</th>
            <th>狀態</th>
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
                  { mission.status }
                </td>
                <td className="text-center">
                  <button
                    className="mx-1"
                    disabled={!mission.isControllable}
                    onClick={() => onRejectMission(mission.id)}
                  >
                    拒絕
                  </button>
                  <button
                    className="mx-1"
                    disabled={!mission.isControllable}
                    onClick={() => onFinishMission(mission.id)}
                  >
                    確認完成
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default MissionIsTakenTable;
