<script setup lang="ts">
import { IParticipant } from '@/interfaces/IParticipant';
import { defineProps } from 'vue';

defineProps<{
    participant: IParticipant
}>();

</script>

<template>


    <div v-if="participant.mediastreams">
        <video :src-object.prop.camel="participant.mediastreams[0]" autoplay muted></video>

        
    </div>
</template>