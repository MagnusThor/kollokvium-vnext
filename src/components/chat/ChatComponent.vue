<script setup lang="ts">
import { randomString } from "@/helpers/randomString";
import { IChatMessage } from "@/interfaces/IChatMessage";
import { useContext } from "@/shared/useContext";
import { useStreams } from "@/shared/useStreams";
import { reactive } from "vue";

const streams = useStreams();
const context = useContext();

const dataChannel = streams.dataChannels.get("arbitrary-dc");

const model = reactive({
    chatMessages: [] as IChatMessage[],
    message: ""
});

const sendMessage = () =>  {
    const msg = {
        text:  model.message,
        from:  context.user.nickname,
        language: context.user.language,
        id: randomString(1),
        dateTime: Date.now()
    } as IChatMessage    


    dataChannel?.invoke("chatMessage" ,msg);    

    model.chatMessages.push(msg);

    model.message = "";    

    
}
dataChannel?.on<IChatMessage>("chatMessage", (msg) => {
    model.chatMessages.push(msg);    
});

</script>
<template>
    <div>
        <input type="text" @keyup.enter="sendMessage()" v-model="model.message">
        <div class="messages" v-for="message in model.chatMessages" v-bind:key="message.id">
            <p>
                <mark>
                    {{message.from}}
                </mark>
                {{message.text}}
            </p>
        </div>
  
    </div>
</template>
<style scoped>
</style>