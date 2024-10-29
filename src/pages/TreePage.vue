<template>
  <div class="container">
    <tree-component :tree="treeData" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import TreeComponent from "@/components/TreeComponent.vue";

const treeData = ref([
  {
    id: 1,
    name: "Documents",
    isExpand: false,
    children: [
      {
        id: 2,
        name: "Work",
        isExpand: false,
        children: [
          { id: 3, name: "Expenses.doc", isExpand: false, children: [] },
          { id: 4, name: "Resume.doc", isExpand: false, children: [] },
        ],
      },
      {
        id: 5,
        name: "Home",
        isExpand: false,
        children: [{ id: 6, name: "Invoices.txt", isExpand: false, children: [] }],
      },
    ],
  },
  {
    id: 6,
    name: "Events",
    isExpand: false,
    children: [
      { id: 7, name: "Meeting", isExpand: false, children: [] },
      { id: 8, name: "Product Launch", isExpand: false, children: [] },
      { id: 9, name: "Conference", isExpand: false, children: [] },
    ],
  },
]);
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
