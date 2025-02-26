import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'https://api.unsplash.com/search/photos'
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

export interface Image {
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

export const useImageStore = defineStore('imageStore', {
  state: () => ({
    images: [] as Image[],
    loading: false as boolean,
    error: null as string | null,
  }),

  actions: {
    async fetchImages(query = 'african') {
      this.loading = true
      this.error = null

      try {
        const response = await axios.get<{ results: Image[] }>(API_URL, {
          params: {
            query,
            per_page: 8,
            order_by: 'latest',
          },
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
        })

        this.images = response.data.results
      } catch (err) {
        console.error('Error fetching images:', err)
        this.error = 'Failed to fetch images.'
      } finally {
        this.loading = false
      }
    },
  },
})
