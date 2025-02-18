import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'https://api.unsplash.com/search/photos'
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

export const useImageStore = defineStore('imageStore', {
  state: () => ({ images: [], loading: false, error: '' }),
  actions: {
    async fetchImages(query: string) {
      this.loading = true
      this.error = ''
      try {
        const response = await axios.get(API_URL, {
          params: { query, per_page: 20, client_id: 'iplK95MtHZL2QW2INEEOqlo1bamVCcycCPsPutnf9rU' },
        })
        this.images = response.data.results
        console.log(this.images)
      } catch (error) {
        this.error = 'Failed to fetch images.'
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
})
