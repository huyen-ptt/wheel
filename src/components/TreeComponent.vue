<template>
  <ul>
    <li v-for="(node, index) in tree" :key="node.id" class="node-tree">
      <div
        class="node-content"
        :class="{
          'active-node': node.isActive,  // Áp dụng class khi isActive = true
        }"
        @click="setActive(node)"
      >
        <span @click.stop="toggle(node)" class="toggle-icon">
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
import { ref } from "vue";
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
    }, 500);
  }
};

const setActive = (node) => {
  if (node.isActive) {
    node.isActive = false;  // Nếu node đã active, bỏ active
  } else {
    // Đặt tất cả node khác thành không active
    props.tree.forEach((n) => {
      if (n.id !== node.id) {
        n.isActive = false;
      }
    });
    node.isActive = true;  // Đặt node này làm active
  }
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
.active-node {
  background-color: #767e81; /* Áp dụng màu nền khi node được chọn */
}
.loading-spinner {
  position: absolute;
  left: 10px;
  top: 2px;
  width: 19px;
  height: 17px;
  border: 2px solid transparent;
  border-top: 2px solid rgb(10, 10, 10);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  position: absolute;
  left: -19px;
  top: 0%;
  transform: translateY(-50%);
}
.fa-minus,
.fa-plus {
  width: 20px;
  height: 17px;
  position: absolute;
  left: -19px;
  top: 1px;
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
