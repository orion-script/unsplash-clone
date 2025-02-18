<!-- <script setup lang="ts">
import SearchBar from './components/SearchBar.vue'
import ImageGrid from './components/ImageGrid.vue'
</script>

<template>
  <div class="app">
    <header>
      <h1>Unsplash Clone</h1>
      <SearchBar />
    </header>

    <main>
      <ImageGrid />
    </main>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
}

header {
  width: 100%;
  text-align: center;
  padding: 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
  background: transparent; /* Fix: Remove box-like appearance */
  backdrop-filter: blur(5px); /* Optional: Glassmorphism effect */
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #222; /* Ensure good visibility */
}

main {
  width: 100%;
  max-width: 1200px;
  padding: 10px;
}
</style> -->

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

// API Key from .env
const API_URL = 'https://api.unsplash.com/search/photos'
// const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
const ACCESS_KEY = 'iplK95MtHZL2QW2INEEOqlo1bamVCcycCPsPutnf9rU'

// State variables
const query = ref('nature')
const images = ref<any[]>([])
const loading = ref(false)
const error = ref('')

// Fetch images from Unsplash
const fetchImages = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await axios.get(API_URL, {
      params: { query: query.value, per_page: 20, client_id: ACCESS_KEY },
    })
    images.value = response.data.results
  } catch (err) {
    error.value = 'Failed to fetch images.'
  } finally {
    loading.value = false
  }
}

// Fetch images on mount
onMounted(fetchImages)
</script>

<template>
  <div class="app">
    <header>
      <h1>Unsplash Clone</h1>
      <div class="search-bar">
        <input v-model="query" placeholder="Search images..." @keyup.enter="fetchImages" />
        <button @click="fetchImages">Search</button>
      </div>
    </header>

    <main>
      <p v-if="loading" class="loading">Loading images...</p>
      <p v-if="error" class="error">{{ error }}</p>

      <div v-if="images.length" class="grid">
        <div v-for="image in images" :key="image.id" class="grid-item">
          <img :src="image.urls.small" :alt="image.alt_description" />
          <div class="overlay">
            <p>{{ image.user.name }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* General App Styles */
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
}

/* Header */
header {
  width: 100%;
  text-align: center;
  padding: 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Search Bar */
.search-bar {
  margin-top: 10px;
}

input {
  padding: 8px;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 8px 12px;
  margin-left: 10px;
  border: none;
  background: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

/* Loading & Error */
.loading,
.error {
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
  color: red;
}

/* Image Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  padding: 20px;
}

.grid-item {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
}

.grid-item img {
  width: 100%;
  display: block;
  transition: transform 0.3s ease-in-out;
}

.grid-item:hover img {
  transform: scale(1.05);
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
