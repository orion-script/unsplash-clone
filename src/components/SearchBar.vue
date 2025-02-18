<template>
  <div class="search-bar">
    <!-- Loading state -->
    <div v-if="isLoading" class="search-info">
      Searching for <span class="highlight">"{{ query }}"</span>
    </div>

    <!-- Search result state -->
    <div v-else-if="searchCompleted" class="search-info">
      Search result for <span class="highlight">"{{ query }}"</span>
      <button class="new-search-btn" @click="resetSearch">New Search</button>
    </div>

    <!-- Search input -->
    <div v-else class="search-container">
      <span class="search-icon">🔍</span>
      <input v-model="query" placeholder="Search images..." @keyup.enter="search" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useImageStore } from '../store/useImages'

const query = ref('')
const isLoading = ref(false)
const searchCompleted = ref(false)
const imageStore = useImageStore()

const search = async () => {
  if (!query.value.trim()) return
  isLoading.value = true
  searchCompleted.value = false

  await imageStore.fetchImages(query.value)

  isLoading.value = false
  searchCompleted.value = true
}

const resetSearch = () => {
  searchCompleted.value = false
  query.value = ''
}
</script>

<style scoped>
.search-bar {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.search-container {
  display: flex;
  align-items: center;
  width: 80%;
  background: white;
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
}

.search-icon {
  margin-right: 10px;
  color: #aaa;
}

input {
  flex: 1;
  border: none;
  outline: none;
  height: 40px;
  font-size: 16px;
}

.search-info {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
  text-align: left;
  width: 80%;
}

.new-search-btn {
  margin-top: 10px;
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  background: green;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
</style>
