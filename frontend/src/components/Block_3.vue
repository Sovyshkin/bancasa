<script setup>
import { useMainStore } from "../stores/main.ts";
import { computed } from "vue";

const mainStore = useMainStore();

const info = computed(() => {
  return mainStore.components;
});
</script>
<template>
  <ul class="img-list">
    <li class="img-item">
      <img
        v-if="info.block_3_image_1"
        :src="`http://localhost:1337${info.block_3_image_1.url}`"
        alt=""
      />
      <div class="hidden-text">{{ info.block_3_text_1 }}</div>
    </li>
    <li class="img-item">
        <img
          v-if="info.block_3_image_1"
          :src="`http://localhost:1337${info.block_3_image_2.url}`"
          alt=""
        />
        <div class="hidden-text">{{ info.block_3_text_2 }}</div>
      </li>
      <li class="img-item">
        <img
          v-if="info.block_3_image_1"
          :src="`http://localhost:1337${info.block_3_image_3.url}`"
          alt=""
        />
        <div class="hidden-text">{{ info.block_3_text_3 }}</div>
      </li>
  </ul>
</template>
<style scoped>
.img-list {
    height: 100vh;
    width: 100%;
    display: flex;
}

.img-item {
    flex: 1;
    position: relative;
    overflow: hidden;
}

.img-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index: 2;
    transition: transform 0.5s ease;
}

.img-item:hover img {
    transform: scale(1.08) translateY(-10%);
}

.hidden-text {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #7F6E5E;
    color: white;
    text-align: center;
    padding: 15px;
    z-index: -1;
}

@media (max-width: 1023px) {
    .img-list {
        flex-direction: column;
        height: auto;
    }

    .img-item img {
        min-height: 800px;
        max-height: 800px;
    }

    .img-item:hover img {
        transform: scale(1.08) translateY(-11%);
    }

    .hidden-text {
        font-size: 28px;
    }
}

@media (max-width: 768px) {
    .img-item:hover img {
        transform: scale(1.08) translateY(-10%);
    }
}
</style>
