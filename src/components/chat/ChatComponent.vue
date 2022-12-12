<script setup lang="ts">
import { IChatMessage } from "@/interfaces/IChatMessage";
import { useStreams } from "@/shared/useStreams";

import { reactive } from "vue";

const streams = useStreams();



const dataChannel = streams.dataChannels.get("arbitrary-dc");

const model = reactive({
    chatMessages: [] as IChatMessage[],
    message: ""
});

const sendMessage = () =>  {
    const msg = {
        text:  model.message,
        from:  "",
        language: ""
    } as IChatMessage    

    model.message = "";    

    

    dataChannel?.invoke("chatMessage" ,msg);    
    // add to self also
    model.chatMessages.push(msg);
    
}

dataChannel?.on<IChatMessage>("chatMessage", (msg) => {
    model.chatMessages.push(msg);    
});

</script>
<template>
    <div>
        <input type="text" @keyup.enter="sendMessage()" :v-model="model.message">
        <div class="messages">
        </div>
        {{ model.chatMessages.length }}
    </div>
</template>
<style scoped>
video {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    max-width: 160px;
}
</style>