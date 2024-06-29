'use client'
import { useState } from 'react';
import MissionForm from '@/app/board/components/MissionForm';
import WaitingForTakeMissionTable from '@/app/board/components/WaitingForTakeMissionTable';
import MissionTakenTable from '@/app/board/components/MissionTakenTable';
import MissionIsTakenTable from '@/app/board/components/MissionIsTakenTable';

const MissionSystem = ({
  account,
  waitingForTakeMissions,
  missionsTaken,
  missionsIsTaken,
  onPostMission,
  onCancelMission,
  onTakeMission,
  onAbandonMission,
  onSubmitFinishMission,
  onFinishMission,
}) => {
  const [postMissionFormVisible, setPostMissionFormVisible] = useState(false);
  const openPostMissionForm = () => setPostMissionFormVisible(true);
  const closePostMissionForm = () => setPostMissionFormVisible(false);

  return (
    <div>
      <div>
        <p>{ `使用者：${account.name}` }</p>
        <p>{ `金錢：${account.balance}` }</p>
      </div>
      {
        postMissionFormVisible ? (
          <MissionForm
            onConfirm={onPostMission}
            onCancel={closePostMissionForm}
          />
        ) : (
          <button onClick={openPostMissionForm}>
            張貼任務
          </button>
        )
      }
      <div className="mt-4">
        <WaitingForTakeMissionTable
          missions={waitingForTakeMissions}
          onCancelMission={onCancelMission}
          onTakeMission={onTakeMission}
        />
      </div>
      <div className="mt-4">
        <MissionTakenTable
          missions={missionsTaken}
          onAbandonMission={onAbandonMission}
          onSubmitFinishMission={onSubmitFinishMission}
        />
      </div>
      <div className="mt-4">
        <MissionIsTakenTable
          missions={missionsIsTaken}
          onAbandonMission={() => null}
          onFinishMission={onFinishMission}
        />
      </div>
    </div>
  );
};

export default MissionSystem;
