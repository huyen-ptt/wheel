<template>
  <div class="container">
    <button @click="openTree" class="open">Mở tất cả</button>
    <button @click="closeTree" class="close1">Đóng tất cả</button>
    <tree-component :tree="treeData" />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import TreeComponent from '@/components/TreeComponent.vue';

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
          {
            id: 3,
            name: "Expenses.doc",
            isExpand: false,
            children: [
              { id: 11, name: "Hello.doc", isExpand: false, children: [] },
              {
                id: 12,
                name: "Hi.doc",
                isExpand: false,
                children: [
                  { id: 13, name: "Test1.doc", isExpand: false, children: [] },
                  { id: 14, name: "Test2.doc", isExpand: false, children: [] },
                ],
              },
            ],
          },
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

const openTree = () => {
  toggleNodes(treeData.value, true);
};

const closeTree = () => {
  toggleNodes(treeData.value, false);
};

const toggleNodes = (nodes, expand) => {
  nodes.forEach(node => {
    node.isExpand = expand;
    if (node.children && node.children.length > 0) {
      toggleNodes(node.children, expand);//ktra xem có trê con khoogn , nếu có thì gọi lại hàm này để thay đổi trạng thái mở đóng
    }
  });
};
</script>
<style scoped>
.container {
  padding: 20px;
}
.open, .close1 {
  padding: 10px 15px;
  border-radius: 8px;
  border: 0;
  margin-right: 5px;
  cursor: pointer;
}
</style> 
