<template>
  <ul>
    <li v-for="i in container" :key="i.id" class="bao">
      {{ i.title }} <button>Xóa</button>
    </li>
  </ul>
  <button @click="getApi">Get Posts</button>
</template>
<script setup>
import { ref } from "vue";
const container = ref([]);
const getApi = () => {
  // let url = 'https://jsonplaceholder.typicode.com/posts'
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((res) => {
      console.log("res", res);
      container.value = res;
    })
    .catch((error) => {
      console.log("error", error);
    });
};
const postApi = () => {
  fetch('https://jsonplaceholder.typicode.com/posts');
  
};
</script>
<style scoped>
.bao {
  display: flex;
  gap: 10px;
}
</style>
