// import { defineStore } from 'pinia'
// import axios from 'axios'

// const API_URL = 'https://api.unsplash.com/search/photos'
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
// const ACCESS_KEY = 'iplK95MtHZL2QW2INEEOqlo1bamVCcycCPsPutnf9rU'

// export const useImageStore = defineStore('imageStore', {
//   state: () => ({ images: [], loading: false, error: '' }),
//   actions: {
//     async fetchImages(query: string) {
//       this.loading = true
//       this.error = ''
//       try {
//         const response = await axios.get(API_URL, {
//           params: { query, per_page: 20, client_id: ACCESS_KEY },
//         })
//         this.images = response.data.results
//         console.log('image', this.images)
//       } catch (err) {
//         this.error = 'Failed to fetch images.'
//         console.error(err)
//       } finally {
//         this.loading = false
//       }
//     },
//   },
// })

import { defineStore } from 'pinia'
import axios from 'axios'

// const ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY'

export const useImageStore = defineStore('imageStore', {
  state: () => ({
    images: [],
  }),
  actions: {
    async fetchImages(query = 'african') {
      try {
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
          params: {
            query,
            per_page: 8,
            order_by: 'latest',
            client_id: ACCESS_KEY,
          },
        })
        this.images = response.data.results
      } catch (error) {
        console.error('Error fetching images:', error)
      }
    },
  },
})
