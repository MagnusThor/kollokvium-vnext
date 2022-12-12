import { defineStore } from 'pinia'
import { IUser } from '../interfaces/IUser';
import { useStreams } from './useStreams';




export const useContext = defineStore('context', {
  state: () => {
    return { 
        hasJoinded: false,
        uuid: "",
        slug: "",
        user: {} as IUser
    }
  },  
  actions: {
    updateNickname(){

    },
    join(slug:string) {
      this.slug = slug;

    },
  },
})