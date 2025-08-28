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
      v-if="info.block_2_image"
      :style="{
        backgroundImage: `url(http://38.180.141.64${info.block_2_image.url})`,
      }"
    ></div>
    <div class="content">
        <h1>{{ info.block_2_title }}</h1>
        <h2>{{ info.block_2_subtitle }}</h2>
        <p v-html="info.block_2_text"></p>
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
  height: auto;
}

h1 {
  color: #6B452E;
  text-align: right;
}

h2 {
  color: #6B452E;
  text-align: right;
}

p {
    color: #6B452E;
  text-align: right;
}

@media (max-width: 1600px) {

  .content {
    justify-content: center;
    padding-top: 10vh;
  }
}
</style>
