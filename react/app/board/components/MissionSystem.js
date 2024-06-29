'use client'
import { useState } from 'react';
import MissionForm from '@/app/board/components/MissionForm';
import WaitingForTakeMissionTable from '@/app/board/components/WaitingForTakeMissionTable';
import MissionTakenTable from '@/app/board/components/MissionTakenTable';

const MissionSystem = ({
  account,
  waitingForTakeMissions,
  missionsTaken,
  onPostMission,
  onCancelMission,
  onTakeMission,
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
          onAbandonMission={() => null}
          onSubmitFinishMission={() => null}
        />
      </div>
    </div>
  );
};

export default MissionSystem;
