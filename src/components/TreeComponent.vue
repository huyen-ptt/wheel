<template>

  <ul>
    <li v-for="(node, index) in tree" :key="node.id" class="node-tree">
      <div
        class="node-content"
        @mouseover="node.isHovering = true"
        @mouseleave="node.isHovering = false"
        :class="{ 'node-hover': node.isHovering }"
      >
        <span @click="toggle(node)" class="toggle-icon">
      
          <div v-if="node.loading" class="loading-spinner"></div>
          <i
            v-else-if="node.children && node.children.length"
            :class="node.isExpand ? 'fas fa-minus' : 'fas fa-plus'"
          ></i>
        </span>
        <span class="label">
          <i
            :class="
              node.children && node.children.length ? 'fas fa-folder' : 'fas fa-file-alt'
            "
            class="icon"
          ></i>
          {{ node.name }}
        </span>
      </div>
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

const toggle = (node) => {
  if (node.children && node.children.length) {
    node.loading = true;
    setTimeout(() => {
      node.isExpand = !node.isExpand;
      node.loading = false;
    }, 1000);
  } else {
    node.isExpand = !node.isExpand;
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
  position: relative;
}
.node-tree .node-content {
  padding: 5px;
  transition: background-color 0.3s;
}
.node-hover {
  background-color: aqua;
}
.loading-spinner {
  width: 19px;
  height: 17px;
  border: 2px solid transparent;
  border-top: 2px solid rgb(168 28 28);
  border-radius: 50%;
  animation: spin-cd9f0a55 0.8s linear infinite;
  position: absolute;
  left: -19px;
  top: 0%;
  transform: translateY(-50%);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
