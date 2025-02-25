<template>
  <div>
    <div v-if="loading" class="skeleton-container">
      <div class="skeleton-loader" v-for="n in 8" :key="n"></div>
    </div>

    <p v-if="error" class="error">{{ error }}</p>

    <div v-else-if="images.length && !loading" class="grid">
      <ImageCard v-for="image in images" :key="image.id" :image="image" />
    </div>

    <p v-else-if="!loading && !images.length" class="no-results">No images found.</p>
  </div>
</template>

<script setup lang="ts">
import { useImageStore } from '../store/useImages'
import { storeToRefs } from 'pinia'
import ImageCard from './ImageCard.vue'
import { watch } from 'vue'

const imageStore = useImageStore()
const { images, loading, error } = storeToRefs(imageStore)

watch(loading, (newLoading) => {
  if (newLoading) {
    imageStore.images = []
  }
})
</script>

<style scoped>
.skeleton-container {
  width: 70%;
  margin: auto;
  display: grid;
  grid-template-columns: auto auto auto;
  column-count: 3;
  column-gap: 10px;
  gap: 10px;
  padding: 10px;
}

.skeleton-loader {
  height: 200px;
  background: #e0e0e0;
  border-radius: 10px;
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    background: #e0e0e0;
  }
  50% {
    background: #d0d0d0;
  }
  100% {
    background: #e0e0e0;
  }
}

/* Grid Layout */
.grid {
  column-count: 3;
  column-gap: 10px;
  width: 100%;
  max-width: 1200px;
  margin: auto;
}

/* Error and No Results */
.loading,
.error,
.no-results {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
}

@media (max-width: 1024px) {
  .grid {
    column-count: 3;
  }
}

@media (max-width: 768px) {
  .grid {
    column-count: 2;
  }
}
</style>
