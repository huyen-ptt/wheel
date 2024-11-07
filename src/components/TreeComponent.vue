<template>
  <ul>
    <li v-for="(node, index) in tree" :key="node.id" class="node-tree">
      <div
        class="node-content"
        @mouseover="node.isHovering = true"
        @mouseleave="node.isHovering = false"
        @click="activeNode = node.id"
        :class="{ 'node-hover': node.isHovering,  }"
      >
      <!-- 'active-node': activeNode === node.id -->
        <span @click="toggle(node)" class="toggle-icon">
          <div v-if="node.loading" class="loading-spinner"></div>
          <i
            v-else-if="node.children && node.children.length"
            :class="node.isExpand ? 'fas fa-minus' : 'fas fa-plus'"
          ></i>
        </span>
        <span @click="setActive(node)" class="label">
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
import { ref } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  tree: Array,
});

const activeNode = ref(null);

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

const setActive = (node) => {
  activeNode.value = node.id;
};
</script>

<style scoped>
ul {
  list-style-type: none;
  margin-left: 20px;
  user-select: none;
}
.toggle-icon {
  cursor: pointer;
  margin-right: 5px;
  position: relative;
  user-select: none;
}
.node-tree .node-content {
  padding: 5px;
  transition: background-color 0.3s;
  position: relative;
}

.node-hover {
  background-color: aqua;
}
.active-node {
  background-color: #add8e6; /* Màu nền cho item đang active */
}
.loading-spinner {
  position: absolute;
  left: 10px;
  top: 2px;
  width: 19px;
  height: 17px;
  border: 2px solid transparent;
  border-top: 2px solid rgb(168 28 28);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  position: absolute;
  left: -19px;
  top: 0%;
  transform: translateY(-50%);
}
.fa-minus {
  width: 20px;
  height: 17px;
  position: absolute;
  left: -19px;
  top: 1px;
}
.fa-plus {
  width: 20px;
  height: 17px;
  position: absolute;
  left: -18px;
  top: 2px;
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
