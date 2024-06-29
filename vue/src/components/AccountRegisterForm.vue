<script setup>
import { ref } from 'vue';
import CommandErrorFactory from '../modules/board/valueObjects/CommandErrorFactory';

const props = defineProps({
  onRegisterAccount: {
    type: Function,
    default: () => null
  },
});

const accountName = ref('');
const submitAccountName = async () => {
  try {
    await props.onRegisterAccount(accountName.value);
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
</script>

<template>
  <div>
    請輸入你的姓名：
    <input v-model="accountName" />
    <button @click="submitAccountName">
      確定
    </button>
  </div>
</template>
