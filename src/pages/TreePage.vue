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
    children: [
      {
        id: 2,
        name: "Work",
        children: [
          { id: 3, name: "Expenses.doc", children: [] },
          { id: 4, name: "Resume.doc", children: [] },
        ],
      },
      {
        id: 5,
        name: "Home",
        children: [{ id: 6, name: "Invoices.txt", children: [] }],
      },
    ],
  },
  {
    id: 6,
    name: "Events",
    children: [
      { id: 7, name: "Meeting", children: [] },
      { id: 8, name: "Product Launch", children: [] },
      { id: 9, name: "Product Launch", children: [] },
    ],
  },
]);
</script>

<style scoped>
/* Thêm CSS tùy chỉnh nếu cần */
</style>
