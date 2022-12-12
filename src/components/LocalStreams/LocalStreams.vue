<script setup lang="ts">
import { useStreams } from "@/shared/useStreams";
const streams = useStreams();
const mediaStreams = streams.localStreams;
</script>
<template>
   
<div v-for="mediaStream in mediaStreams" :key="mediaStream.id">
    <video :src-object.prop.camel="mediaStream" autoplay muted>
    </video>        
</div>
</template>
<style scoped>
video {
    position: absolute;
    right: 1rem;
    bottom:1rem;
    max-width: 160px;
}
</style>