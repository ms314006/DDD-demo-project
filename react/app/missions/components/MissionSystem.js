'use client'
import { useState } from 'react';
import MissionForm from '@/app/missions/components/MissionForm';
import MissionTable from '@/app/missions/components/MissionTable';
import CommandErrorFactory from '@/app/modules/missions/application/CommandErrorFactory';

export default ({ account, missions, onPostMission }) => {
  const [postMissionFormVisible, setPostMissionFormVisible] = useState(false);
  const openPostMissionForm = () => setPostMissionFormVisible(true);
  const closePostMissionForm = () => setPostMissionFormVisible(false);

  const handlePostMission = async (mission) => {
    try {
      await onPostMission(mission);
    } catch (e) {
      switch (e.message) {
        case CommandErrorFactory.getErrorMessages().NOT_ENOUGH_MONEY_TO_PAY_REWARD:
          alert('擁有的金錢不足以支付獎金');
          break;
        case CommandErrorFactory.getErrorMessages().INVALID_MISSION_TITLE:
          alert('輸入的任務標題不得為空白');
          break;
        default:
          alert('未知錯誤');
          break;
      }
    }
  }

  return (
    <div>
      <h1>接任務系統</h1>
      <div>
        <p>{ `使用者：${account.name}` }</p>
        <p>{ `金錢：${account.money}` }</p>
      </div>
      {
        postMissionFormVisible ? (
          <MissionForm
            onConfirm={handlePostMission}
            onCancel={closePostMissionForm}
          />
        ) : (
          <button onClick={openPostMissionForm}>
            張貼任務
          </button>
        )
      }
      <div className="mt-4">
        <MissionTable missions={missions} />
      </div>
    </div>
  );
};
