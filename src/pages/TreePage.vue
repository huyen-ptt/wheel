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

    <tree-component :tree="filteredTree"
    :selecttedNode="selecttedNode"
    @on-select="onSelectNode"
     @emit_resetActive="resetAllActiveTree(filteredTree, $event)"/>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import TreeComponent from "@/components/TreeComponent.vue";

// Dữ liệu cây ban đầu
const treeData = ref([
  {
    id: 1,
    name: "Documents",
    isExpand: false,
    isActive: false,
    children: [
      {
        id: 2,
        name: "Expenses.doc",
        isExpand: false,
        isActive: false,
        children: [
          {
            id: 3,
            name: "Expenses.doc",
            isExpand: false,
            isActive: false,
            children: [
              { id: 11, name: "Hello.doc", isExpand: false, isActive: false, children: [] },
              {
                id: 12,
                name: "Hi.doc",
                isExpand: false,
                isActive: false,
                children: [
                  { id: 13, name: "Test1.doc", isExpand: false, isActive: false, children: [] },
                  { id: 14, name: "Test2.doc", isExpand: false, isActive: false, children: [] },
                ],
              },
            ],
          },
          { id: 4, name: "Resume.doc", isExpand: false, isActive: false, children: [] },
        ],
      },
      {
        id: 5,
        name: "Home",
        isExpand: false,
        isActive: false,
        children: [{ id: 6, name: "Invoices.txt", isExpand: false, isActive: false, children: [] }],
      },
    ],
  },
  {
    id: 777,
    name: "Events",
    isExpand: false,
    isActive: false,
    children: [
      { id: 7, name: "Meeting", isExpand: false, isActive: false, children: [] },
      { id: 8, name: "Product Launch", isExpand: false, isActive: false, children: [] },
      { id: 9, name: "Conference", isExpand: false, isActive: false, children: [] },
    ],
  },
]);


const searchItemTree = ref("");
const selecttedNode = ref(null)

// Mở tất cả cây
const openAllTree = () => {
  toggleNodes(treeData.value, true);
};

// Đóng tất cả cây
const closeAllTree = () => {
  toggleNodes(treeData.value, false);
};

const onSelectNode = (node) => {
  selecttedNode.value = node;
}

const resetAllActiveTree = (nodes, nodeEmited) => {
  nodes.forEach((node) => {
    if (node.id !== nodeEmited.id) {
      node.isActive = false;
    }
    if (node.children && node.children.length > 0) {
      resetAllActiveTree(node.children, nodeEmited);
    }
  });
}

const toggleNodes = (nodes, expand) => {
  nodes.forEach((node) => {
    node.isExpand = expand;
    if (node.children && node.children.length > 0) {
      toggleNodes(node.children, expand);
    }
  });
};

// Hàm lọc cây theo từ khóa tìm kiếm
const filterTree = (nodes, query) => {
  return nodes
    .map((node) => {
      if (node.name.toLowerCase().includes(query.toLowerCase())) {
        return node; // Trả về node gốc nếu khớp với từ khóa
      }
      if (node.children && node.children.length > 0) {
        const filteredChildren = filterTree(node.children, query);
        if (filteredChildren.length > 0) {
          node.children = filteredChildren;// Lọc con mà không thay đổi trạng thái node
          return node; 
        }
      }
      return null;
    })
    .filter((node) => node !== null);  // Bỏ các node không phù hợp
};


const filteredTree = computed(() => {
  if (searchItemTree.value.trim() === "") {
    return treeData.value; // Trả về cây gốc nếu không tìm kiếm
  }
  const filteredData = filterTree(treeData.value, searchItemTree.value);
  return filteredData.length > 0 ? filteredData : [];
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

.open,
.close1 {
  padding: 10px 15px;
  border-radius: 8px;
  border: 0;
  margin-right: 5px;
  cursor: pointer;
}
</style>
