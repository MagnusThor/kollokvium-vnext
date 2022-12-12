<script setup lang="ts">
import { useStreams } from "@/shared/useStreams";
import { reactive } from "vue";
import ParticipantComponent from "../participant/ParticipantComponent.vue";

const streams = useStreams();
const participants = reactive(streams.participats);

</script>   
<template>

   <div v-for="[key, value] in participants" v-bind:key="key">


    <ParticipantComponent :participant="value">

    </ParticipantComponent>
  
    

  </div>

</template>
<style scoped>

</style>