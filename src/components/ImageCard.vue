<template>
  <div class="grid-item" @click="openModal">
    <img :src="image.urls.small" :alt="image.alt_description" />
    <div class="overlay">
      <p class="author">{{ image.user.name }}</p>
      <p class="location">{{ image.user.location }}</p>
    </div>
  </div>

  <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="close-btn" @click="closeModal">&times;</button>
      <img :src="image.urls.regular" :alt="image.alt_description" />
      <div class="modal-info">
        <p class="modal-author">{{ image.user.name }}</p>
        <p class="modal-location">{{ image.user.location }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

const props = defineProps<{ image: any }>()
const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

console.log('props', props.image)
</script>

<style scoped>
.grid-item {
  display: inline-block;
  width: 100%;
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
}

.grid-item img {
  width: 100%;
  display: block;
  border-radius: 10px;
}

.overlay {
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 0;
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
  color: white;
  padding: 10px;
  font-size: 14px;
  transition: background 0.3s ease-in-out;
}

.author,
.location {
  font-weight: bold;
  display: inline-block;
  margin: 5px;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
}

.modal-content img {
  max-width: 100%;
  max-height: 80vh;
  border-radius: 10px 10px 0 0;
  display: block;
}

.modal-info {
  background-color: white;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 0 0 10px 10px;
}

.modal-author {
  font-size: 28px;
  font-weight: bold;
  background: white;
  color: black;
  padding: 5px;
  border-radius: 5px;
  display: inline-block;
  margin: 5px;
}

.modal-location {
  font-size: 16px;
  font-weight: bold;
  background: white;
  color: #333;
  padding: 5px;
  border-radius: 5px;
  display: inline-block;
  margin: 5px;
}

.close-btn {
  position: absolute;
  top: 50px;
  right: 70px;
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  color: white;
}

@media (max-width: 1024px) {
  .close-btn {
    top: 250px;
    right: 30px;
    font-size: 20px;
    padding: 5px;
  }

  .modal-content {
    max-width: 80%;
  }
}
@media (max-width: 768px) {
  .close-btn {
    top: 150px;
    right: 5px;
    font-size: 20px;
    padding: 5px;
  }

  .modal-content {
    max-width: 85%;
  }
}
</style>
