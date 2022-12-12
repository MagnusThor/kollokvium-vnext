import { defineStore } from 'pinia'

export const useParticipant = defineStore('participant', {
  state: () => {
    return { count: 0 }
  },  
  actions: {
    increment() {
      this.count++
    },
  },
})