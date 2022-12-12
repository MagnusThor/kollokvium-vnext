<script setup lang="ts">
import { useStreams } from "@/shared/useStreams";
import { reactive } from "vue";

const streams = useStreams();
const remoteStreams = reactive(streams.participats);

</script>   
<template>

   <div v-for="[key, value] in remoteStreams" v-bind:key="key">

    <template v-if="value.mediastreams" >
    <video  :src-object.prop.camel="value.mediastreams[0]" autoplay muted></video>        
    </template>
    
  
    

  </div>

</template>
<style scoped>

</style>