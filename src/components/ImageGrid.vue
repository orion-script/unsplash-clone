<!-- <template>
  <div>
    <p v-if="imageStore.loading" class="loading">Loading images...</p>
    <p v-if="imageStore.error" class="error">{{ imageStore.error }}</p>

    <div v-if="imageStore.images.length" class="grid">
      <ImageCard v-for="image in imageStore.images" :key="image.id" :image="image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useImageStore } from '../store/useImages'
import ImageCard from './ImageCard.vue'

const imageStore = useImageStore()
</script>

<style scoped>
.grid {
  column-count: 3;
  column-gap: 10px;
  width: 100%;
  max-width: 1200px;
  margin: auto;
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
</style> -->

<template>
  <div>
    <p v-if="loading" class="loading">Loading images...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="images.length" class="grid">
      <ImageCard v-for="image in images" :key="image.id" :image="image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useImageStore } from '../store/useImages'
import { storeToRefs } from 'pinia'
import ImageCard from './ImageCard.vue'

const imageStore = useImageStore()
const { images, loading, error } = storeToRefs(imageStore)
</script>

<style scoped>
.grid {
  column-count: 3;
  column-gap: 10px;
  width: 100%;
  max-width: 1200px;
  margin: auto;
}

.loading,
.error {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
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
