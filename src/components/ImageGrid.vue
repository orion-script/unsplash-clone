<script setup lang="ts">
import { useImageStore } from '../stores/useImages'
import ImageCard from './ImageCard.vue'
const imageStore = useImageStore()
</script>

<template>
  <div class="grid">
    <div v-for="image in imageStore.images" :key="image.id" class="grid-item">
      <ImageCard :image="image" />
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  padding: 20px;
}
</style>
