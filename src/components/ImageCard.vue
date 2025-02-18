<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{ image: any }>()
const openModal = () => console.log('Open modal for', props.image.id)
</script>

<template>
  <div class="card" @click="openModal">
    <img :src="image.urls.small" :alt="image.alt_description" />
    <div class="overlay">
      <p>{{ image.user.name }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  cursor: pointer;
}
.card img {
  width: 100%;
  display: block;
}
.overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  text-align: center;
}
</style>
