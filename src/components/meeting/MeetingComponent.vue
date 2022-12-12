<script setup lang="ts">
import { useContext } from '@/shared/useContext';
import { useStreams } from '@/shared/useStreams';
import { onMounted } from 'vue';

import ChatComponent from '../chat/ChatComponent.vue';
import JoinComponent from '../Join/JoinComponent.vue';
import LocalStreams from '../LocalStreams/LocalStreams.vue';
import RemoteStreams from '../RemoteStreams/RemoteStreams.vue';
import ToolbarComponent from '../toolbar/ToolbarComponent.vue';
import SettingsComponent from '../settings/SettingsComponent.vue';

const context = useContext();

onMounted(async () => {
  const streams = useStreams();
  streams.connect();
  await streams.addLocalStream();
});


</script>

<template>
  <nav class="navbar bg-light">
    <div class="container-fluid">
      <span class="navbar-brand">{{ context.uuid
      }}</span>
    </div>
  </nav>


  <ToolbarComponent>

  </ToolbarComponent>


  <SettingsComponent>
    
  </SettingsComponent>



  <div class="container">



    <div v-if="context.hasJoinded">
      <ChatComponent></ChatComponent>

    </div>
    <div v-if="context.hasJoinded">
      <RemoteStreams></RemoteStreams>
    </div>
    <div v-else>

      <JoinComponent></JoinComponent>

    </div>

    <div>
      <LocalStreams></LocalStreams>
    </div>
  </div>
</template>