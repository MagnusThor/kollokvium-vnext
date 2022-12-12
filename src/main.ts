import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import MeetingComponent from './components/meeting/MeetingComponent.vue'
import { useStreams } from './shared/useStreams'

const pinia = createPinia();

const app = createApp(App).use(pinia);


const routes = [
    {
        path: '/',
        name: 'default',
        component: MeetingComponent
    }    
    
]



const router = createRouter({ history: createWebHistory(), routes })

app.use(router)

app.mount('#app')
