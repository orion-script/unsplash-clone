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
      <button class="arrow left-arrow" @click.stop="prevImage">❮</button>
      <img :src="currentImage.urls.regular" :alt="currentImage.alt_description" />
      <button class="arrow right-arrow" @click.stop="nextImage">❯</button>
      <div class="modal-info">
        <p class="modal-author">{{ currentImage.user.name }}</p>
        <p class="modal-location">{{ currentImage.user.location }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from 'vue'

interface Image {
  id: string
  urls: {
    small: string
    regular: string
  }
  alt_description: string
  user: {
    name: string
    location?: string
  }
}

const props = defineProps<{
  image: Image
  images: Image[]
  index: number
}>()

const isModalOpen = ref(false)
const currentIndex = ref(props.index)
const currentImage = ref(props.image)

const openModal = () => {
  currentIndex.value = props.index // ✅ Ensure correct index when opening
  currentImage.value = props.images[currentIndex.value] // ✅ Sync currentImage
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
  currentImage.value = props.images[currentIndex.value]
}

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
  currentImage.value = props.images[currentIndex.value]
}

watch(currentIndex, (newIndex) => {
  currentImage.value = props.images[newIndex]
})
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

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 30px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 50%;
  z-index: 1001;
}

.left-arrow {
  left: 10px;
}

.right-arrow {
  right: 10px;
}

.arrow:hover {
  background: rgba(0, 0, 0, 0.8);
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
