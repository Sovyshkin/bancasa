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
      v-if="info.block_1_image"
      :style="{
        backgroundImage: `url(https://admin.ban.casa${info.block_1_image.url})`,
      }"
    ></div>
    <div class="content">
      <div class="wrap-title">
        <span class="promo">{{ info.block_1_promo }}</span>
        <h1>{{ info.block_1_title }}</h1>
      </div>
      <div class="wrap-text">
        <h2>{{ info.block_1_text }}</h2>
        <h3 v-html="info.block_1_text_2"></h3>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrap {
  padding-top: 10vh;
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
  justify-content: space-between;
  align-items: center;
  height: 477px;
}


/* Телефоны (320px - 767px) */
@media (max-width: 767px) {

  .wrap {
    padding-top: 10vh;
  }

}

@media (max-height: 700px) {
  .content {
    height: 350px;
  }
}
</style>