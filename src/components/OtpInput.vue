<template>
  <div class="otp-display">
    <div class="bao" v-for="index in length" :key="index">
      <input
        class="duoc-nhap"
        :maxlength="1"
        :type="typeInput"
        v-model="otpValues[index - 1]"
        @input="handleInput(index - 1)"
        @paste="handlePaste"
        @keydown.backspace="handleBackspace(index - 1, $event)"
        @keydown="handleKeyDown(index - 1, $event)"
        @focus="selectAllValue($event)"
        :disabled="disabled"
        :autofocus="index === 1"
        
        :style="inputStyles"
      />
      <span v-if="index !== length" class="dau">{{ separator }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

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
    default: '#f0f0f0',
  },
  bgColor: {
    type: String,
    default: '#D3D3D3',
  },
  color: {
    type: String,
    default: '#000000',
  },
  
});

const emit = defineEmits();

const inputStyles = {
  backgroundColor: props.bgColor, 
  color: props.color, 
  borderColor: props.baseColor,
};


const handleInput = (index) => {
  emit("update:otpValues", [...props.otpValues]);

  if (props.otpValues[index].length === 1 && index < props.length - 1) {
    focusInput(index + 1);
  }
};


const handleBackspace = (index, event) => {
  if (event.key === "Backspace") {
    event.preventDefault(); 

    const inputs = document.querySelectorAll(".duoc-nhap");

    if (props.otpValues[index]) {
      props.otpValues[index] = "";
      emit("update:otpValues", [...props.otpValues]); 
      inputs[index].focus();
      inputs[index].select();
    } else if (index > 0) {
      props.otpValues[index - 1] = ""; 
      emit("update:otpValues", [...props.otpValues]); 
      inputs[index - 1].focus(); 
      inputs[index - 1].select(); 
    }
  }
};


const handleKeyDown = (index, event) => {
  if (event.key === "ArrowRight" && index < props.length - 1) {
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

// Focus on a specific input
const focusInput = (index) => {
  const inputs = document.querySelectorAll(".duoc-nhap");
  if (inputs[index]) {
    inputs[index].focus();
    inputs[index].select();
  }
};

// Handle paste event
const handlePaste = (event) => {
  const pastedText = event.clipboardData.getData("text").split("");
  const newValues = pastedText.slice(0, props.length);
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
.dau{
  font-size: 35px;
  padding-left: 23px;

}
</style>
