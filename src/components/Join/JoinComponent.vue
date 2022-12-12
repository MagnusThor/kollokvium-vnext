<script setup lang="ts">
import { randomString } from '@/helpers/randomString';
import { useStreams } from '@/shared/useStreams';
import { reactive } from 'vue';

const model = reactive({
    slug: "",
});

const setRandomName = () => {
    model.slug = randomString(3);
};

const joinMeeting = async () => {
    const streams = useStreams();
    
    streams.changeContext(model.slug);

    

};

</script>

<template>
    <div class="vh-100 align-items-center">
        <div class="row align-items-center h-100">
            <div class="col-md-6 offset-md-3">
                <div class="input-group mb-3">
                    <button class="btn btn-outline-secondary" type="button" id="btn-randomName"
                        @click="setRandomName()">
                        <i class="bi bi-dice-5"></i>
                    </button>
                    <input type="text" class="form-control" placeholder="Name of meeting" v-model="model.slug">
                    <button class="btn btn-outline-secondary" type="button" v-bind:disabled="(model.slug.length < 6)"
                        @click="joinMeeting()">Join</button>
                </div>
            </div>
        </div>
    </div>
</template>