<template>
  <ul>
    <li v-for="(node, index) in tree" :key="node.id" class="node-tree">
      <div
        class="node-content"
         @mouseover="node.isHovering = true"
        @mouseleave="node.isHovering = false"
        :class="{ 'active-node': node.isActive }"
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
        @emit_resetActive="emitResetActive()"
      />
    </li>
  </ul>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  tree: Array,
});
const emit = defineEmits();

const toggle = (node) => {
  if (node.children && node.children.length) {
    node.loading = true;
    setTimeout(() => {
      node.isExpand = !node.isExpand;
      node.loading = false;
      // debugger
    }, 500);
  }
};

const setActive = (node) => {
  onResetActive(props.tree);
  console.log(props.tree);
  emit("emit_resetActive", node);
  node.isActive = true;
};

const onResetActive = (tree) => {
  tree.forEach((node) => {
    node.isActive = false;
    if (node.children && node.children.length > 0) {
      onResetActive(node.children);
    }
  });
};

const emitResetActive = () => {
  onResetActive(props.tree);
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
