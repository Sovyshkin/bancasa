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
      v-if="info.block_9_image"
      :style="{
        backgroundImage: `url(http://localhost:1337${info.block_9_image.url})`,
      }"
    ></div>
    <div class="content">
        <h1>{{ info.block_9_title }}</h1>
        <h2>{{ info.block_9_subtitle }}</h2>
        <p v-html="info.block_9_text"></p>
    </div>
  </div>
</template>
<style scoped>
.wrap {
  position: relative;
  display: flex;
  justify-content: end;
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
