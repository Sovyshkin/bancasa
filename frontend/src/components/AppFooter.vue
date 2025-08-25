<script setup>
import { useMainStore } from "../stores/main.ts";
import { computed } from 'vue';

const mainStore = useMainStore();

const info = computed(() => {
  return mainStore.components;
});
</script>

<template>
  <footer>
    <div class="info">
      <h3>{{ info.footer_title }}</h3>
      <p>{{ info.footer_subtitle }}</p>
      <div class="group-input">
        <input type="text" :placeholder="info.footer_placeholder" v-model="mainStore.email"/>
        <div class="wrap-img" @click="mainStore.saveEmail()">
            <img class="arrow" src="@/assets/arrow-right.svg" alt="" />
        </div>
      </div>
      <transition name="fade">
        <div v-if="mainStore.showSuccessMessage" class="success-message">
          {{ info.footer_feedback }}
        </div>
      </transition>
    </div>
    <div class="wrap-logo">
        <img class="logo" v-if="info.footer_logo" :src="`http://localhost:1337${info.footer_logo.url}`" alt="">
        <span class="year">{{ info.footer_year }}</span>
    </div>
  </footer>
</template>
<style scoped>
footer {
    width: 100%;
    background: #E5DDD6;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 567px;
    padding: 70px 20px 20px 20px;
}

.info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
}

h3, p {
    text-align: center;
    color: #7F6E5E;
}


.group-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
     min-width: 200px;
    width: 100%;
    max-width: 558px;
    background-color: rgba(59, 59, 59, 0.1);
    padding: 10px 10px 10px 20px;
}

.group-input input {
  flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #7F6E5E;
    padding: 0;
    margin: 0;
    line-height: 24px;
    height: 24px;
    font-size: 16px;
    vertical-align: middle;
}

.group-input input::placeholder {
    line-height: 24px;
    position: relative;
    top: 0;
}

.group-input {
    align-items: center;
}

.group-input input::-webkit-input-placeholder {
    line-height: 24px;
}
.group-input input::-moz-placeholder {
    line-height: 24px;
}
.group-input input:-ms-input-placeholder {
    line-height: 24px;
}

.wrap-img {
    background-color: #7F6E5E;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px;
}

.arrow {
    height: 24px;
    width: 24px;
}

input::placeholder {
    font-size: 14px;
    color: #7F6E5E;
    font-weight: 300;
}

.wrap-logo {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 25px;
}

.year {
    color: #7F6E5E;
    font-size: 14px;
    font-weight: 300;
}

.success-message {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #7F6E5E;
  color: white;
  border-radius: 4px;
  font-size: 18px;
  text-align: center;
  animation: slideUp 0.5s ease;
}

/* Анимации */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes slideUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  footer {
    padding: 40px 20px 20px 20px;
    height: 450px;
  }
  .success-message {
    font-size: 16px;
    padding: 8px 15px;
  }
}
</style>
