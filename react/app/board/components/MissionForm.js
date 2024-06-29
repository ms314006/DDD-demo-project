'use client'
import { useState } from 'react';

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
    await onConfirm(missionFields);
    handleCancel();
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
            handleSetMissionFields({ cost: value });
          }}
        />
      </div>
      <div className="mb-4">
        完成報酬：
        <input
          type="number"
          value={missionFields.reward}
          onInput={({ target: { value } }) => {
            handleSetMissionFields({ reward: value });
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
