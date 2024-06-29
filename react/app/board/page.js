'use client'
import getBoardViewModel from "@/app/board/getBoardViewModel";
import MissionSystem from '@/app/board/components/MissionSystem';
import AccountRegisterForm from '@/app/board/components/AccountRegisterForm';

const BoardScreen = ({ getBoardViewModel }) => {
  const {
    account,
    missions,
    handlePostMission,
    handleCancelMission,
    handleTakeMission,
    handleRegisterAccount,
  } = getBoardViewModel();

  return (
    <div className="p-6">
      <h1>佈告欄</h1>
      {
        account ? (
          <MissionSystem
            account={account}
            missions={missions}
            onPostMission={handlePostMission}
            onCancelMission={handleCancelMission}
            onTakeMission={handleTakeMission}
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
