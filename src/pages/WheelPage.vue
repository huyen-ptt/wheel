<template>
  <div class="container">
    <textarea
      type="text"
      v-model="name"
      @keyup.enter="enterName"
      placeholder="Nhập tên vào đây"
    ></textarea>

    <div class="bao">
      <div
        class="mui-ten"
        :class="{ 'mui-ten-do': isCanGetLuckyItem }"
        @click="rotateChart"
      ></div>
    </div>

    <div id="chartContainer" style="height: 370px; width: 100%"></div>

    <div class="angles">
      <h5>Các item và độ góc:</h5>
      <div v-for="(item, index) in items" :key="index" class="angle-item">
        {{ item.name }}: {{ (index * (360 / items.length)).toFixed(2) }}°
      </div>
      <div v-if="finalAngle !== null">
        <h5>Độ góc sau khi quay:</h5>
        <div v-for="(item, index) in items" :key="index" class="angle-item">
          {{ item.name }}: {{ ((finalAngle + index * (360 / items.length)) % 360).toFixed(2) }}°
        </div>
      </div>
    </div>

    <div v-if="showWinnerModal" class="modal fade show" style="display: block;" tabindex="-1" role="dialog" aria-labelledby="winnerModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="winnerModalLabel">Chúc mừng!</h5>
            <button type="button" class="close" @click="closeWinnerModal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>{{ winnerMessage }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeWinnerModal">Đóng</button>
            <button type="button" class="btn btn-primary" @click="confirmDelete">Xóa người chơi này</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showWinnerModal" class="modal-backdrop fade show"></div>
    <div v-if="showConfirmModal" class="modal fade show" style="display: block;" tabindex="-1" role="dialog" aria-labelledby="confirmModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmModalLabel">Xác nhận</h5>
            <button type="button" class="close" @click="closeConfirmModal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Bạn có chắc chắn muốn xóa người chơi này không?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeConfirmModal">Hủy</button>
            <button type="button" class="btn btn-danger" @click="deleteWinner">Xóa</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showConfirmModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";

let chart;
const name = ref("");
const items = ref([]);
const isSpinning = ref(false);
const startAngle = ref(0);
const finalAngle = ref(null); // Biến lưu góc cuối cùng
const winnerMessage = ref("");
const showWinnerModal = ref(false); 
const showConfirmModal = ref(false); 
let currentWinningIndex = ref(null); 

const isCanGetLuckyItem = computed(() => items.value.length >= 2);

const initializeChart = () => {
  chart = new window.CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    data: [
      {
        type: "pie",
        startAngle: startAngle.value,
        yValueFormatString: '##0.00"%"',
        indexLabel: "{label}",
        indexLabelPlacement: "inside",
        dataPoints: [{ y: 1, label: "Mời bạn nhập" }],
      },
    ],
  });
  chart.render();
};

const updateChart = () => {
  const dataPoints = items.value.length === 0 
    ? [{ y: 1, label: "Chưa có tên" }]
    : items.value.map(item => ({ y: 1, label: item.name }));

  chart.options.data[0].dataPoints = dataPoints;
  chart.render();
};

onMounted(() => {
  initializeChart();
});

const enterName = () => {
  const text = name.value.trim();
  if (text) {
    const lines = text.split("\n");
    items.value = lines
      .map(line => line.trim())
      .filter(line => line)
      .map((name, index) => ({ class: `item-${index + 1}`, name }));
    updateChart();
  } else {
    items.value = [];
    updateChart();
  }
};

const rotateChart = () => {
  if (isSpinning.value) {
    alert("Vòng quay đang diễn ra, vui lòng đợi.");
    return;
  }

  if (isCanGetLuckyItem.value) {
    isSpinning.value = true;

    const numberOfRevolutions = 3;
    const additionalRotation = 72; // Thêm 1/5 vòng
    const totalRotation = (numberOfRevolutions * 360) + additionalRotation; 

    let remainingRotation = totalRotation;
    let rotate;

    const rotateFunction = () => {
      if (remainingRotation > 0) {
        let rotateStep = Math.min(10, remainingRotation); 
        startAngle.value += rotateStep; 
        remainingRotation -= rotateStep; 
        chart.options.data[0].startAngle = startAngle.value % 360; 
        chart.render();

        rotate = requestAnimationFrame(rotateFunction);
      } else {
        cancelAnimationFrame(rotate);

        finalAngle.value = (startAngle.value + additionalRotation) % 360; // Lưu góc cuối cùng

        setTimeout(() => {
          // Tìm item có góc lớn nhất
          const maxAngleIndex = items.value.reduce((maxIndex, currentItem, index) => {
            const currentAngle = (finalAngle.value + index * (360 / items.value.length)) % 360;
            return (currentAngle > (finalAngle.value + maxIndex * (360 / items.value.length)) % 360) ? index : maxIndex;
          }, 0);

          const winningItem = items.value[maxAngleIndex];

          winnerMessage.value = `Item có góc lớn nhất là: ${winningItem.name} `;
          
          showWinnerModal.value = true; 
          isSpinning.value = false; 
        }, 800);
      }
    };

    rotate = requestAnimationFrame(rotateFunction);
  } else {
    alert("Bạn hãy nhập tên rồi mới quay");
  }
};


const deleteWinner = () => {
  if (currentWinningIndex.value !== null) {
    items.value = items.value.filter((_, index) => index !== currentWinningIndex.value);
    updateChart();
    updateTextarea();
  }
  showConfirmModal.value = false; 
  showWinnerModal.value = false; 
};

const confirmDelete = () => {
  showConfirmModal.value = true;
};

const closeWinnerModal = () => {
  showWinnerModal.value = false;
};

const closeConfirmModal = () => {
  showConfirmModal.value = false; 
};

const updateTextarea = () => {
  name.value = items.value.map(item => item.name).join("\n");
};
</script>

<style scoped>
textarea {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: 0.3s ease-in-out;
}

textarea:focus {
  border-color: #66afe9;
  box-shadow: 0 0 8px rgba(102, 175, 233, 0.6);
  outline: none;
}

.bao {
  position: relative;
  margin: 50px auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mui-ten {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
}

.mui-ten-do {
  border-top: 40px solid rgb(225, 26, 26);
}

.angles {
  margin-top: 20px;
}

.angle-item {
  font-size: 14px
}
</style>