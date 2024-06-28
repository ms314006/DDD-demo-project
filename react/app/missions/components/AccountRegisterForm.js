'use client'
import { useState } from 'react';
import CommandErrorFactory from '@/app/modules/missions/application/CommandErrorFactory';

export default ({ onRegisterAccountByName }) => {
  const [accountName, setAccountName] = useState('');
  const submitAccountName = async () => {
    try {
      await onRegisterAccountByName(accountName);
    } catch (e) {
      switch (e.message) {
        case CommandErrorFactory.getErrorMessages().INVALID_ACCOUNT_NAME:
          alert('輸入的使用者名稱不得為空白');
          break;
        default:
          alert('未知錯誤');
          break;
      }
    }
  }

  return (
    <div>
      請輸入你的姓名：
      <input
        value={accountName}
        onInput={({ target: { value } }) => setAccountName(value)}
      />
      <button onClick={submitAccountName}>
        確定
      </button>
    </div>
  );
};
