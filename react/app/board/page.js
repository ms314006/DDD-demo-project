'use client'
import getBoardViewModel from "@/app/board/getBoardViewModel";
import MissionSystem from '@/app/board/components/MissionSystem';
import AccountRegisterForm from '@/app/board/components/AccountRegisterForm';

const BoardScreen = ({ getBoardViewModel }) => {
  const {
    account,
    waitingForTakeMissions,
    missionsTaken,
    missionsIsTaken,
    handlePostMission,
    handleCancelMission,
    handleTakeMission,
    handleAbandonMission,
    handleSubmitFinishMission,
    handleFinishMission,
    handleRejectMission,
    handleRegisterAccount,
  } = getBoardViewModel();

  return (
    <div className="p-6">
      <h1>接任務系統</h1>
      {
        account ? (
          <MissionSystem
            account={account}
            waitingForTakeMissions={waitingForTakeMissions}
            missionsTaken={missionsTaken}
            missionsIsTaken={missionsIsTaken}
            onPostMission={handlePostMission}
            onCancelMission={handleCancelMission}
            onTakeMission={handleTakeMission}
            onAbandonMission={handleAbandonMission}
            onSubmitFinishMission={handleSubmitFinishMission}
            onFinishMission={handleFinishMission}
            onRejectMission={handleRejectMission}
          />
        ) : (
          <AccountRegisterForm
            onRegisterAccount={handleRegisterAccount}
          />
        )
      }
    </div>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default () => (
  <BoardScreen getBoardViewModel={getBoardViewModel} />
);
