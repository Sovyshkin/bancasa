<script setup>
import { useMainStore } from "../stores/main.ts";
import { computed } from "vue";

const mainStore = useMainStore();

const info = computed(() => {
  return mainStore.components;
});
</script>
<template>
  <div class="wrap">
    <video
      v-if="info.block_4_image"
      class="block-bg"
      autoplay
      muted
      loop
      playsinline
    >
      <source
        :src="`https://admin.ban.casa${info.block_4_image.url}`"
        type="video/mp4"
      />
    </video>
    <div class="content">
      <h1>{{ info.block_4_title }}</h1>
      <h2>{{ info.block_4_subtitle }}</h2>
      <p v-html="info.block_4_text"></p>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  position: relative;
  display: flex;
  justify-content: end;
}

.block-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.content {
  position: relative;
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: end;
  max-width: 750px;
  gap: 20px;
}

h1 {
  color: #fff;
  text-align: right;
}

h2 {
  color: #fff;
  text-align: right;
}

p {
  color: #fff;
  text-align: right;
}
</style>
