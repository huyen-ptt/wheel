<template>
  <ul>
    <li v-for="(node, index) in tree" :key="node.id" class="node-tree">
      <span @click="toggle(node)" class="toggle-icon">
        <i
          v-if="node.children && node.children.length"
          :class="isOpen(node) ? 'fas fa-minus' : 'fas fa-plus'"
        ></i>
      </span>
      <span class="label">{{ node.name }}</span>
      <tree-component
        v-if="node.children && node.children.length && isOpen(node)"
        :tree="node.children"
      />
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  tree: Array,
});

const openNodes = ref([]);

// Hàm để kiểm tra node đang mở hay đóng
const isOpen = (node) => openNodes.value.includes(node.id);



// Hàm để thay đổi trạng thái mở/đóng của node
const toggle = (node) => {
  if (isOpen(node)) {
    openNodes.value = openNodes.value.filter((id) => id !== node.id); //tạo một mảng mới, loại bỏ node.id khỏi openNodes.value, giúp đóng node lại.
  } else {
    openNodes.value.push(node.id); // nếu node đag đóng thì thêm id vào mảng để mở ra
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  margin-left: 20px;
}
.toggle-icon {
  cursor: pointer;
  margin-right: 5px;
}
</style>
