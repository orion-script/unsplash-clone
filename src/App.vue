<template>
  <div class="app">
    <header>
      <SearchBar />
    </header>
    <main>
      <ImageGrid />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useImageStore } from './store/useImages'

import SearchBar from './components/SearchBar.vue'
import ImageGrid from './components/ImageGrid.vue'

const imageStore = useImageStore()

onMounted(() => {
  imageStore.fetchImages()
})
</script>
<style scoped>
.app {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
}

header {
  width: 100%;
  text-align: center;
  padding-top: 8rem;
  padding-bottom: 8rem;
  background: #edf0f2;
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
h1 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #222;
}

main {
  position: absolute;
  top: 17rem;
  width: 100%;
  max-width: 100%;
  padding: 10px;
}

/* tab styles */
@media (max-width: 1024px) {
  header {
    padding-top: 6rem;
    padding-bottom: 8rem;
  }

  main {
    top: 15rem;
    margin: o auto;
    width: 93%;
  }
}

@media (max-width: 768px) {
  header {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  main {
    top: 12rem;
    margin: o auto;
    width: 93%;
  }
}
</style>
