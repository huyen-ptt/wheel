<template>
  <ul>
    <li v-for="(node, index) in tree" :key="node.id" class="node-tree">
      <span @click="toggle(node)" class="toggle-icon">
        <i
          v-if="node.children && node.children.length"
          :class="node.isExpand ? 'fas fa-minus' : 'fas fa-plus'"
        ></i>
      </span>
      <span class="label">
        <i :class="node.children && node.children.length ? 'fas fa-folder' : 'fas fa-file-alt'" class="icon"></i>
        {{ node.name }}
      </span>
      <tree-component
        v-if="node.children && node.children.length && node.isExpand"
        :tree="node.children"
      />
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  tree: Array,
});

//  thay đổi trạng thái mở/đóng của node
const toggle = (node) => {
  node.isExpand = !node.isExpand; 
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
