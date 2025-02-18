<template>
  <div class="search-bar">
    <input v-model="query" placeholder="Search images..." @keyup.enter="search" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useImageStore } from '../stores/useImages'

const query = ref('')
const imageStore = useImageStore()
const search = () => query.value && imageStore.fetchImages(query.value)
</script>
<style scoped>
.search-bar {
  padding: 16px;
  text-align: center;
}
input {
  padding: 8px;
  width: 60%;
  border: none;
  border-radius: 5px;
}
</style>
