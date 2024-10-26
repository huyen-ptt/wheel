<template>
  <ul>
    <li v-for="(node, index) in tree" :key="node.id" class="node-tree">
      <span @click="toggle(node)" class="toggle-icon">
        <i
          v-if="node.children && node.children.length"
          :class="isOpen(node) ? 'fas fa-minus' : 'fas fa-plus'"
        ></i>
      </span>
      <span class="label">
        <i :class="node.children && node.children.length ? 'fas fa-folder' : 'fas fa-file-alt'" class="icon"></i>
        {{ node.name }}
      </span>
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
console.log(openNodes)
// Hàm để thay đổi trạng thái mở/đóng của node
const toggle = (node) => {
  if (isOpen(node)) {
    openNodes.value = openNodes.value.filter((id) => id !== node.id); // loại bỏ node.id khỏi openNodes.value
  } else {
    openNodes.value.push(node.id); // thêm id vào mảng để mở node
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
.node-icon {
  margin-right: 5px;
}
</style>
