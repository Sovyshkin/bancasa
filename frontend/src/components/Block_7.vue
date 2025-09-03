<script setup>
import { useMainStore } from "../stores/main.ts";
import { computed } from "vue";

const mainStore = useMainStore();

const info = computed(() => {
  return mainStore.components;
});
</script>
<template>
  <section class="wrap-content">
    <div class="wrap-img">
        <img v-if="info.block_7_image" :src="`https://admin.ban.casa${info.block_7_image.url}`" alt="">
    </div>
    <div class="content">
        <h1>{{ info.block_7_title }}</h1>
        <h2>{{ info.block_7_subtitle }}</h2>
        <p v-html="info.block_7_text"></p>
        <img class="signature" v-if="info.block_7_signature" :src="`https://admin.ban.casa${info.block_7_signature.url}`" alt="">
        <p class="author" v-html="info.block_7_author"></p>
    </div>
  </section>
</template>
<style scoped>
.wrap-content {
    display: flex;
    gap: 20px;
}

.wrap-img {
    width: 30%;
    max-width: 500px;
    position: sticky;
    top: 0;
    align-self: flex-start;
}

.wrap-img img {
    transform: scaleX(-1);
    filter: grayscale(100%);
    height: 644px;
    object-fit: cover;
    object-position: center;
    display: block;
}

.content {
    width: 70%;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: auto;
}

h1 {
    color: #3A3A3A;
    text-align: left;
}

h2 {
    color: #9C9C9C;
    text-align: left;
}

p {
    color: #3A3A3A;
    text-align: left;
}

.signature {
    width: 446px;
    margin-left: 0;
    margin-right: auto;
}

.author {
    color: #9C9C9C;
    text-align: left;
}

@media (max-width: 1100px) {
    .wrap-content {
        flex-direction: column;
    }

    .wrap-img, .content {
        width: 100%;
    }

    .wrap-img {
        position: relative;
        max-width: none;
    }

    .wrap-img img {
        width: 100%;
        height: auto;
    }
}

/* Планшеты (768px - 1023px) */
@media (max-width: 1023px) {
    .content {
        align-items: center;
        text-align: center;
        padding: 30px 20px;
    }

    h1, h2, p, .author {
        text-align: center;
    }

    .signature {
        margin-left: auto;
        margin-right: auto;
    }
}

/* Телефоны (до 767px) */
@media (max-width: 767px) {
    .content {
        align-items: flex-start;
        text-align: left;
        padding: 20px 15px;
    }

    h1, h2, p, .author {
        text-align: left;
    }

    .signature {
        width: 300px;
        margin-left: 0;
        margin-right: auto;
    }
}

/* Маленькие телефоны (до 480px) */
@media (max-width: 480px) {
    .content {
        padding: 15px 10px;
    }

    .signature {
        width: 250px;
    }
}
</style>