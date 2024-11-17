<template>
  <ul>
    <li v-for="(node, index) in tree" :key="node.id" class="node-tree">
      <!-- :class="{ 'active-node': node.isActive }" -->
      <div
        class="node-content"
         @mouseover="node.isHovering = true"
        @mouseleave="node.isHovering = false"
        :class="{ 'active-node': selecttedNode && node.id === selecttedNode.id }"
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
        :selecttedNode="selecttedNode"
        @on-select="emitResetActive"
        @emit_resetActive="emitResetActive"
      />
    </li>
  </ul>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  tree: Array,
  selecttedNode: {
    type: Object,
    default() {
      return null
    }
  }
});
const emit = defineEmits(['emit_resetActive', 'on-select']);

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
  // emit("emit_resetActive", node);
  emit("on-select", node);
  // node.isActive = true;
};


const emitResetActive = (node) => {
  // emit("emit_resetActive", node);
  emit("on-select", node);
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
  display: flex;
  width: 300px;
  border-radius: 6px;
}
.active-node {
  background-color: black;
  color: white;

}
.active-node .loading-spinner{
  border-top: 2px solid rgb(255, 255, 255);

}
.loading-spinner {
  /* position: absolute; */
  left: 10px;
  top: 2px;
  width: 19px;
  height: 17px;
  border: 2px solid transparent;
  border-top: 2px solid rgb(10, 10, 10);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  left: -19px;
  top: 0%;
  transform: translateY(-50%);
}
.fa-minus,
.fa-plus:hover {
  /* color: white; */
}
.fa-minus,
.fa-plus {
  width: 19px;
  height: 17px;
  /* position: absolute; */
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
