<script setup>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import AppLoader from "./components/AppLoader.vue";
import { useMainStore } from "./stores/main.ts";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const mainStore = useMainStore();
const router = useRouter();

router.beforeEach((to, from, next) => {
  mainStore.isLoading = true;
  next();

  setTimeout(() => {
    mainStore.isLoading = false;
  }, 500);
});

onMounted(async () => {
  await mainStore.getComponents();
  
});
</script>
<template>
  <AppHeader />
  <main>
    <div class="wrap-loader" v-if="mainStore.isLoading">
      <AppLoader />
    </div>
    <router-view v-else v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <AppFooter />
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap");
#app {
  font-family: "Red Hat Display", sans-serif;
  width: 100%;
}
* {
  padding: 0px;
  margin: 0px;
  border: none;
  font-weight: 300;
  font-style: normal;
  font-size: 32px;
  font-family: "Red Hat Display", sans-serif;
  color: #fff;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.wrapper {
  width: 100%;
}

body,
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Links */

a,
a:link,
a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

/* Common */

aside,
nav,
footer,
header,
section,
main {
  display: block;
}

ul,
ul li {
  list-style: none;
}

img {
  vertical-align: top;
}

img,
svg {
  max-width: 100%;
  height: auto;
}

address {
  font-style: normal;
}

/* Form */

input,
textarea,
button,
select {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background-color: transparent;
}

input::-ms-clear {
  display: none;
}

button,
input[type="submit"] {
  display: inline-block;
  box-shadow: none;
  background-color: transparent;
  background: none;
  cursor: pointer;
}

input:focus,
input:active,
button:focus,
button:active {
  outline: none;
  box-shadow: none;
}

button::-moz-focus-inner {
  padding: 0;
  border: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.card {
  transition: all 500ms ease;
  cursor: pointer;
}

h1 {
  font-size: 96px;
}

h2 {
  font-size: 64px;
}

h3 {
  font-size: 32px;
}

p {
  font-size: 32px;
}

main {
  min-height: 90vh;
}

.wrap-loader {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Ноутбуки (1024px - 1440px) */
@media (max-width: 1440px) {
  h1 {
    font-size: 72px;
  }

  h2 {
    font-size: 48px;
  }

  .content {
    height: 400px;
  }
}

/* Планшеты (768px - 1023px) */
@media (max-width: 1023px) {
  h1 {
    font-size: 56px;
  }

  h2 {
    font-size: 36px;
  }

  p {
    font-size: 28px;
  }

  .content {
    height: 350px;
    padding: 15px;
  }
}

/* Телефоны (320px - 767px) */
@media (max-width: 767px) {
  h1 {
    font-size: 36px;
    line-height: 1.2;
  }

  h2,
  .promo {
    font-size: 28px;
  }

  h3 {
    font-size: 24px;
  }

  p {
    font-size: 20px;
  }

  .content {
    width: 100%;
    height: auto;
    min-height: 300px;
    padding: 10px;
    gap: 20px;
  }

  .wrap {
    padding: 20px;
  }

  .wrap-title,
  .wrap-text {
    width: 100%;
  }
}

/* Маленькие телефоны (до 375px) */
@media (max-width: 375px) {
  h1 {
    font-size: 32px;
  }

  h2 {
    font-size: 20px;
  }

  h3 {
    font-size: 18px;
  }

  p {
    font-size: 16px;
  }

  .promo {
    font-size: 14px;
  }
}
</style>
