'use client'
import useMissionsViewModel from "@/app/missions/hooks/useMissionsViewModel";
import MissionSystem from '@/app/missions/components/MissionSystem';
import AccountRegisterForm from '@/app/missions/components/AccountRegisterForm';

export default () => {
  const {
    account,
    missions,
    handlePostMission,
    handleRegisterAccountByName,
  } = useMissionsViewModel();

  return (
    <div className="p-6">
      {
        account ? (
          <MissionSystem
            account={account}
            missions={missions}
            onPostMission={handlePostMission}
          />
        ) : (
          <AccountRegisterForm
            onRegisterAccountByName={handleRegisterAccountByName}
          />
        )
      }
    </div>
  );
};
