<template>
  <div class="otp-display">
    <div class="bao" v-for="(number, index) in length" :key="index">
      <input
        class="duoc-nhap"
        :maxlength="1"
        :type="typeInput"
        v-model="otpValues[index]"
        @input="handleInput(index)"
        @paste="handlePaste"
        @keydown.backspace="handleBackspace(index, $event)"
        @keydown="handleKeyDown(index, $event)"
        @focus="selectAllValue($event)"
        :disabled="disabled"
        :autofocus="index === 0"
        :style="inputStyles"
      />
      <span v-if="index !== length" class="dau">{{ separator }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, toRef } from "vue";

const props = defineProps({
  separator: {
    type: String,
    default: "-",
  },
  otpValues: {
    type: Array,
    required: true,
  },
  typeInput: {
    type: String,
    default: "text",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  length: {
    type: Number,
    required: true,
  },
  baseColor: {
    type: String,
    default: undefined,
  },
  bgColor: {
    type: String,
    default: undefined,
  },
  color: {
    type: String,
    default: undefined,
  },
});

const separator = toRef(props, 'separator');
const otpValues = toRef(props, 'otpValues');
const typeInput = toRef(props, 'typeInput');
const disabled = toRef(props, 'disabled');
const length = toRef(props, 'length');
const baseColor = toRef(props, 'baseColor');
const bgColor = toRef(props, 'bgColor');
const color = toRef(props, 'color');

const emit = defineEmits();
const inputStyles = computed(() => ({
  backgroundColor: bgColor.value,
  color: color.value,
  borderColor: baseColor.value,
}));

const handleInput = (index) => {
  emit("update:otpValues", [...otpValues.value]);

  if (otpValues.value[index].length === 1 && index < length.value - 1) {
    focusInput(index + 1);
  }
};

const handleBackspace = (index, event) => {
  if (event.key === "Backspace") {
    event.preventDefault();

    const inputs = document.querySelectorAll(".duoc-nhap");

    if (otpValues.value[index]) {
      otpValues.value[index] = "";
      emit("update:otpValues", [...otpValues.value]);
      inputs[index].focus();
      inputs[index].select();
    } else if (index > 0) {
      otpValues.value[index - 1] = "";
      emit("update:otpValues", [...otpValues.value]);
      inputs[index - 1].focus();
      inputs[index - 1].select();
    }
  }
};

const handleKeyDown = (index, event) => {
  if (event.key === "ArrowRight" && index < length.value - 1) {
    focusInput(index + 1);
    event.preventDefault();
  }
  if (event.key === "ArrowLeft" && index > 0) {
    focusInput(index - 1);
    event.preventDefault();
  }
};

const selectAllValue = (event) => {
  event.target.select();
};

const focusInput = (index) => {
  const inputs = document.querySelectorAll(".duoc-nhap");
  if (inputs[index]) {
    inputs[index].focus();
    inputs[index].select();
  }
};

const handlePaste = (event) => {
  const pastedText = event.clipboardData.getData("text").split("");
  const newValues = pastedText.slice(0, length.value);
  emit("update:otpValues", newValues);
};
</script>

<style scoped>
.otp-display {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  margin-top: 20px;
}
.bao {
  margin-bottom: 13px;
}
.duoc-nhap {
  width: 60px;
  height: 60px;
  border: 1px solid #ccc;
  text-align: center;
  font-size: 24px;
}
.dau {
  font-size: 35px;
  padding-left: 23px;
}
</style>
