// import { defineStore } from 'pinia'
// import axios from 'axios'

// const API_URL = 'https://api.unsplash.com/search/photos'
// const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

// export const useImageStore = defineStore('imageStore', {
//   state: () => ({
//     images: [],
//   }),
//   actions: {
//     async fetchImages(query = 'african') {
//       try {
//         const response = await axios.get(API_URL, {
//           params: {
//             query,
//             per_page: 8,
//             order_by: 'latest',
//             client_id: ACCESS_KEY,
//           },
//         })
//         this.images = response.data.results
//       } catch (error) {
//         console.error('Error fetching images:', error)
//       }
//     },
//   },
// })

import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'https://api.unsplash.com/search/photos'
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

export const useImageStore = defineStore('imageStore', {
  state: () => ({
    images: [] as any[], // Explicitly define type
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchImages(query = 'african') {
      this.loading = true
      this.error = null

      try {
        const response = await axios.get(API_URL, {
          params: {
            query,
            per_page: 8,
            order_by: 'latest',
          },
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`, // Moved client_id to headers
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
