<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6">
        <h4>Nhập mã OTP</h4>
        <form>
          <div class="form-group">
            <label>numInputs</label>
            <input
              class="form-control"
              v-model.number="numInputs"
              type="number"
              min="0"
              max="40"
              oninput="if(this.value > 40) this.value = 40;"
            />
          </div>
          <div class="form-group">
            <label>separator</label>
            <input type="text" v-model="separator" class="form-control" maxlength="1" />
          </div>
          <div class="form-group">
            <label>Value</label>
            <input
              type="text"
              class="form-control"
              v-model="value"
              :maxlength="numInputs"
            />
          </div>
          <div class="form-group">
            <label>Placeholder</label>
            <input type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label for="inputType">inputType</label>
            <select id="inputType" v-model="typeInput" name="inputType">
              <option value="text">text</option>
              <option value="number">number</option>
              <option value="password">password</option>
              <option value="tel">tel</option>
            </select>
          </div>
        </form>
      </div>
      <div class="col-md-6 da-nhap">
        <h4>Mã OTP đã nhập</h4>
        <div class="otp-display">
          <div class="bao" v-for="index in numInputs" :key="index">
            <input
              class="duoc-nhap"
              maxlength="1"
              :type="typeInput"
              v-model="otpValues[index - 1]"
              @input="updateValueOtp(index - 1)"
              @paste="handlePaste"
               @keydown.backspace="handleBackspace(index - 1, $event)"
            />
            <span v-if="index !== numInputs">{{ separator }}</span>
          </div>
        </div>
        <button type="button" class="btn btn-primary" @click="deleteOtpp">Clear</button>
        <button
          type="button"
          class="btn btn-primary"
          :disabled="value.length !== numInputs"
          @click="getOtp"
        >
          Get OTP
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const numInputs = ref(4);
const separator = ref("-");
const value = ref("");
const otpValues = ref(Array(numInputs.value).fill("")); //vdu ['', '', '', '']
console.log(otpValues, "otpValues");
console.log(value, "v");
const typeInput = ref("text");

watch(value, (newValue) => {
  otpValues.value = newValue.split("").slice(0, numInputs.value);
});
watch(numInputs, (newValue) => {
  if (newValue > 40) {
    numInputs.value = 40;
  }
});
const deleteOtpp = () => {
  value.value = "";
};
const handleBackspace = (index, event) => {
  // Chỉ lùi về ô trước đó khi ô hiện tại đang trống và nhấn Backspace
  if (event.key === 'Backspace' && !otpValues.value[index] && index > 0) {
    focusInput(index - 1);
    event.preventDefault(); // Ngăn chặn hành động mặc định của phím Backspace
  }
};

const getOtp = () => {
  alert(`Mã OTP là ${value.value}`);
};


const updateValueOtp = (index) => {
  value.value = otpValues.value.join('');

  if (!otpValues.value[index] && index > 0) {
    focusInput(index - 1);
  }
  
  else if (otpValues.value[index] && index < numInputs.value - 1) {
    focusInput(index + 1); 
  }
};

const focusInput = (index) => {
  const inputs = document.querySelectorAll('.duoc-nhap');
  if (inputs[index]) {
    inputs[index].focus();
    inputs[index].select(); // Chọn toàn bộ nội dung trong input
  }
};


const handlePaste = (event) => {
  const pastedText = event.clipboardData.getData("text").split("");
  otpValues.value = pastedText.slice(0, numInputs.value); // Lấy từ vị trí đầu tiên (0) đến vị trí bằng giá trị của numInputs
};
</script>

<style scoped>
.otp-input {
  width: 50px;
  text-align: center;
  margin-bottom: 10px;
}
.otp-display {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  margin-top: 20px;
}
.bao {
  margin-bottom: 13px;
}
.otp-display span {
  font-size: 40px;
}
.otp-box {
  border: 1px solid #ccc;
  padding: 15px;
  width: 50px;
  text-align: center;
  font-size: 20px;
}
#inputType {
  margin-left: 10px;
}
.btn-primary {
  margin-left: 10px;
  margin-top: 20px;
}
.otp-display .duoc-nhap {
  width: 60px;
  height: 60px;
  border: 1px solid #ccc;
  text-align: center;
  font-size: 24px;
  margin: 0 18px 0 5px;
}
</style>
