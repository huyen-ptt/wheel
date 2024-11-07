<template>
  <div class="container">
    <input 
      type="text" 
      placeholder="Tìm kiếm..."
      class="search-input"
      v-model="searchItemTree"
      @input="handleSearch"
    />
    
    <button @click="openAllTree" class="open">Mở tất cả</button>
    <button @click="closeAllTree" class="close1">Đóng tất cả</button>
    <tree-component :tree="filteredTree" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
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

const searchItemTree = ref("");

const openAllTree = () => {
  toggleNodes(treeData.value, true);
};

const closeAllTree = () => {
  toggleNodes(treeData.value, false);
};

const toggleNodes = (nodes, expand) => {
  nodes.forEach(node => {
    node.isExpand = expand;
    if (node.children && node.children.length > 0) {
      toggleNodes(node.children, expand);
    }
  });
};

const filterTree = (nodes, query) => {
  return nodes
    .map(node => {
      if (node.name.toLowerCase().includes(query.toLowerCase())) { //ktra chứa từ tìm kieemskhong, hàm toLowerCase kh phân biệt hoa thường
        return { ...node, isExpand: true };
      }
      if (node.children && node.children.length > 0) {
        const filteredChildren = filterTree(node.children, query);
        if (filteredChildren.length > 0) {
          return { ...node, isExpand: true, children: filteredChildren };
        }
      }
      return null;
    })
    .filter(node => node !== null); //loc các gtri null ra khỏi mảng 
};

const filteredTree = computed(() => {
  if (searchItemTree.value.trim() === "") {//trim ktra khoảng trắng
    return treeData.value; //tra lai toan bo mang
  }
  const filteredData = filterTree(treeData.value, searchItemTree.value);
  return filteredData.length > 0 ? filteredData : treeData.value;
});
</script>

<style scoped>
.container {
  padding: 20px;
}
.search-input {
  padding: 8px 12px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 300px;
  margin-right: 10px;
}

.open, .close1 {
  padding: 10px 15px;
  border-radius: 8px;
  border: 0;
  margin-right: 5px;
  cursor: pointer;
}
</style>
