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
              min="1"
              max="40"
            />
          </div>
          <div class="form-group">
            <label>separator</label>
            <input
              type="text"
              v-model="separator"
              class="form-control dau"
              maxlength="1"
            />
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
        <OtpInput
          :length="numInputs"
          :separator="separator"
          v-model:otpValues="otpValues"
          :typeInput="typeInput"
          :disabled="false"
          :bgColor="Bg"
          :baseColor="border"
          :color="colorInput"
        />
        <button type="button" class="btn btn-primary" @click="deleteOtpp">Clear</button>
        <button
          type="button"
          class="btn btn-primary"
          :disabled="value.length !== numInputs"
          @click="getOtp"
        >
          Get OTP
        </button>
        <button @click="changeColor('#e0e0e0')" class="btn btn-primary">
          Đổi màu nền
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import OtpInput from "@/components/OtpInput.vue";
import { ref, watch } from "vue";
const Bg = ref('#D3D3D3');
const border = ref('#f0f0f0');
const colorInput = ref('#000000');


const numInputs = ref(5);
const separator = ref("-");
const value = ref("");
const otpValues = ref(Array(numInputs.value).fill(""));
const typeInput = ref("text");

watch(otpValues, (newValues) => {
  value.value = newValues.join("");
});

watch(value, (newValue) => {
  otpValues.value = newValue.split("").slice(0, numInputs.value);
});

watch(numInputs, (newValue) => {
  if (newValue > 40) {
    numInputs.value = 40;
  }
  otpValues.value = Array(numInputs.value).fill("");
});
const changeColor = (color) => {
     Bg.value = color;
};
const deleteOtpp = () => {
  value.value = "";
};

const getOtp = () => {
  alert(`Mã OTP là ${value.value}`);
};
</script>

<style scoped>
input:focus {
  border: 2px solid blue;
}
.btn-primary {
  margin-left: 10px;
  margin-top: 20px;
}
</style>
