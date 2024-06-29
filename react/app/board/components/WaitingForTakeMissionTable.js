import CommandErrorFactory from "@/app/modules/board/valueObjects/CommandErrorFactory";

const WaitingForTakeMissionTable = ({
  missions,
  onCancelMission,
  onTakeMission,
}) => {
  const handleTakeMission = async (missionId) => {
    try {
      await onTakeMission(missionId);
    } catch (e) {
      switch (e.message) {
        case CommandErrorFactory.getErrorMessages().NOT_ENOUGH_MONEY_TO_TAKE_MISSION:
          alert('擁有的金錢不足以支付接取任務的費用');
          break;
        default:
          alert('未知錯誤');
          break;
      }
    }
  }

  return (
    <div>
      <h2>等待接取</h2>
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
                        onClick={() => handleTakeMission(mission.id)}
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
    </div>
  );
};

export default WaitingForTakeMissionTable;
