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
      v-if="info.block_8_image"
      :style="{
        backgroundImage: `url(http://localhost:1337${info.block_8_image.url})`,
        transform: 'scaleX(-1)'
      }"
    ></div>
    <div class="content">
        <p>{{ info.block_8_subtitle }}</p>
        <h1>{{ info.block_8_title }}</h1>
        <p v-html="info.block_8_text"></p>
    </div>
  </div>
</template>
<style scoped>
.wrap {
    padding-top: 7vh;
  position: relative;
  display: flex;
  justify-content: center;
}

.content {
    width: 80%;
    margin: 0 auto;
  position: relative;
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 750px;
}

h1 {
  color: #6B452E;
  text-align: center;
}

p {
    color: #6B452E;
  text-align: center;
}
</style>
