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
      v-if="info.block_5_image"
      :style="{
        backgroundImage: `url(https://admin.ban.casa${info.block_5_image.url})`,
      }"
    ></div>
    <div class="content">
        <h1>{{ info.block_5_title }}</h1>
        <h2>{{ info.block_5_subtitle }}</h2>
        <h3 v-html="info.block_5_text"></h3>
    </div>
  </div>
</template>
<style scoped>
.wrap {
  padding-top: 7vh;
  position: relative;
}

.content {
  position: relative;
  z-index: 2;
  padding: 20px;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

</style>
