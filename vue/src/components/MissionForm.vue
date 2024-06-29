<script setup>
import { ref } from 'vue';
import CommandErrorFactory from '../modules/board/valueObjects/CommandErrorFactory';

const props = defineProps({
  account: {
    type: { name: String, balance: Number },
    default: { name: '', balance: NaN },
  },
  onConfirm: {
    type: Function,
    default: () => null,
  },
  onCancel: {
    type: Function,
    default: () => null,
  },
});

const initiallyMission = { title: '', cost: 0, reward: 0 };
const missionFields = ref(initiallyMission);
const handleResetMissionFields = () => {
  missionFields.value  = initiallyMission;
};

const handleCancel = () => {
  handleResetMissionFields();
  props.onCancel();
};

const handleConfirm = async () => {
  try {
    await props.onConfirm(missionFields.value);
    props.onCancel();
  } catch (e) {
      console.log({ e });
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
</script>

<template>
  <div>
    <h2>張貼任務表單</h2>
    <div className="mb-4">
      標題：
      <input v-model="missionFields.title" />
    </div>
    <div className="mb-4">
      接取費用：
      <input type="number" v-model="missionFields.cost" />
    </div>
    <div className="mb-4">
      完成報酬：
      <input type="number" v-model="missionFields.reward" />
    </div>
    <button className="mr-2" @click="handleCancel">
      取消
    </button>
    <button className="mr-2" @click="handleConfirm">
      張貼
    </button>
  </div>
</template>
