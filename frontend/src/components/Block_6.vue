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
    <div
      class="block-bg"
      v-if="info.block_6_image"
      :style="{
        backgroundImage: `url(https://admin.ban.casa${info.block_6_image.url})`,
        transform: 'scaleX(-1)'
      }"
    ></div>
    <div class="content">
        <p>{{ info.block_6_subtitle }}</p>
        <h1>{{ info.block_6_title }}</h1>
        <p v-html="info.block_6_text"></p>
    </div>
  </div>
</template>
<style scoped>
.wrap {
    padding-top: 7vh;
  position: relative;
  display: flex;
  justify-content: start;
}

.content {
    width: 80%;
    margin: 0 auto;
  position: relative;
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: start;
  max-width: 750px;
}

h1 {
  color: #6B452E;
  text-align: left;
}

p {
    color: #6B452E;
  text-align: left;
}
</style>
