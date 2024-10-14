<template>
  <div>
    <v-otp-input
      v-model="otpValue"
      :num-inputs="4"
      separator="-"
      :is-number="true"
      @input="onInput"
    />
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
// import VOtpInput from 'v-otp-input';

// const otpValue = ref('');

// const onInput = (value) => {
//   console.log('OTP Value:', value);
// };
</script>

<style scoped>
/* Thêm CSS tùy chỉnh nếu cần */
</style>
