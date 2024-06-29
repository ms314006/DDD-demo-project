'use client'
import { useState } from 'react';
import CommandErrorFactory from '@/app/modules/board/valueObjects/CommandErrorFactory';

const MissionForm = ({ onConfirm, onCancel }) => {
  const initiallyMission = { title: '', cost: 0, reward: 0 };
  const [missionFields, setMissionFields] = useState(initiallyMission);
  const handleResetMissionFields = () => {
    setMissionFields(initiallyMission);
  };
  const handleSetMissionFields = (missionField) => {
    setMissionFields({ ...missionFields, ...missionField });
  };

  const handleCancel = () => {
    handleResetMissionFields();
    onCancel();
  };

  const handleConfirm = async () => {
    try {
      await onConfirm(missionFields);
      onCancel();
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
      <h2>張貼任務表單</h2>
      <div className="mb-4">
        標題：
        <input
          value={missionFields.title}
          onInput={({ target: { value } }) => {
            handleSetMissionFields({ title: value });
          }}
        />
      </div>
      <div className="mb-4">
        接取費用：
        <input
          type="number"
          value={missionFields.cost}
          onInput={({ target: { value } }) => {
            handleSetMissionFields({ cost: Number(value) });
          }}
        />
      </div>
      <div className="mb-4">
        完成報酬：
        <input
          type="number"
          value={missionFields.reward}
          onInput={({ target: { value } }) => {
            handleSetMissionFields({ reward: Number(value) });
          }}
        />
      </div>
      <button className="mr-2" onClick={handleCancel}>
        取消
      </button>
      <button
        className="mr-2"
        onClick={handleConfirm}
      >
        張貼
      </button>
    </div>
  );
};

export default MissionForm;
