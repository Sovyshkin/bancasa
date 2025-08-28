<script setup>
import { defineProps, ref, computed } from "vue";
import { useMainStore } from "../stores/main.ts";

const mainStore = useMainStore();
const props = defineProps({
  card: Object,
});

const isModalOpen = ref(false);

// Определяем тип устройства для лучшей адаптации
const windowWidth = ref(window.innerWidth);
const isMobile = computed(() => windowWidth.value < 768);
const isTablet = computed(() => windowWidth.value >= 768 && windowWidth.value < 1024);

const openModal = () => {
  if (props.card.image) {
    isModalOpen.value = true;
    document.body.style.overflow = 'hidden';
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  document.body.style.overflow = '';
};

const closeOnOverlay = (event) => {
  if (event.target.classList.contains('modal-overlay')) {
    closeModal();
  }
};

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
};

// Обновляем ширину окна при изменении размера
window.addEventListener('resize', () => {
  windowWidth.value = window.innerWidth;
});
</script>

<template>
  <div class="card" :class="{ 
    'card-toggle': mainStore.toggleCatalogActive,
    'mobile-card': isMobile,
    'tablet-card': isTablet
  }">
    <div
      class="wrap-image"
      :class="{ 'image-toggle': mainStore.toggleCatalogActive }"
      @click="openModal"
    >
      <img
        v-if="card.image"
        :src="`http://38.180.141.64${card.image.url}`"
        alt=""
        class="clickable-image"
      />
      <div class="colors" v-if="card.colors && mainStore.toggleCatalogActive">
        <img
          v-for="item in card.colors"
          :src="`http://38.180.141.64${item.url}`"
          :key="item.id"
          alt=""
        />
      </div>
    </div>

    <div
      v-if="isModalOpen"
      class="modal-overlay"
      @click="closeOnOverlay"
      @keydown="handleKeydown"
    >
      <div class="modal-content">
        <button class="modal-close" @click="closeModal">×</button>
        <img
          :src="`http://38.180.141.64${card.image.url}`"
          :alt="card.name"
          class="modal-image"
        />
      </div>
    </div>

    <div class="info" :class="{ 
      'info-toggle': mainStore.toggleCatalogActive,
      'mobile-info': isMobile,
      'tablet-info': isTablet
    }">
      <h1 :class="{ 
        'h1-toggle': mainStore.toggleCatalogActive,
        'mobile-h1': isMobile,
        'tablet-h1': isTablet
      }">
        {{ card.name }}
      </h1>
      <div
        class="desc"
        :class="{ 'text-toggle': mainStore.toggleCatalogActive }"
      >
        <span :class="{ 'desc-toggle': mainStore.toggleCatalogActive }">{{
          card.description
        }}</span>
        <span class="author">{{ card.author }}</span>
      </div>
      <div
        class="desc-more"
        v-if="mainStore.toggleCatalogActive"
        :class="{ 'text-toggle': mainStore.toggleCatalogActive }"
      >
        <span>{{ card.description_2 }}</span>
        <span>{{ card.description_3 }}</span>
      </div>
      <div
        class="wrap-price"
        :class="{ 'text-toggle': mainStore.toggleCatalogActive }"
      >
        <span class="price-text">{{ card.price_text }}</span>
        <div class="price">
          <span class="price-from">{{ card.price_from }}$</span>
          <span>/</span>
          <span>{{ card.price_to }}$</span>
          <span>{{ card.price_text_2 }}</span>
        </div>
      </div>
      <div class="desc-more" v-if="!mainStore.toggleCatalogActive">
        <span>{{ card.description_2 }}</span>
        <span>{{ card.description_3 }}</span>
      </div>
      <div class="colors" v-if="card.colors && !mainStore.toggleCatalogActive">
        <img
          v-for="item in card.colors"
          :src="`http://38.180.141.64${item.url}`"
          :key="item.id"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  display: flex;
  align-items: stretch;
  gap: 50px;
  transition: all 0.3s ease;
}

.card-toggle {
  width: 31%;
  flex-direction: column;
  gap: 10px;
}

.wrap-image {
  flex: 1;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 0;
}

.wrap-image img {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: contain;
  object-position: center;
}

.image-toggle .wrap-image img {
  max-height: 300px;
}

.image-toggle {
  display: flex;
  gap: 10px;
  flex-direction: column;
}

.info {
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 25px;
}

.info-toggle {
  width: 100%;
  gap: 10px;
  justify-content: start;
  align-items: start;
}

.desc,
.wrap-price,
.desc-more {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text-toggle, .text-toggle span{
  align-items: start;
  text-align: start;
}

.price {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

h1 {
  font-size: 48px;
  line-height: 49px;
  letter-spacing: -10%;
  font-weight: 400;
  text-align: center;
  color: #6b452e;
  transition: all 0.3s ease;
}

.h1-toggle {
  font-size: 40px;
  line-height: 49px;
  letter-spacing: -10%;
  text-align: start;
}

span {
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  color: #6b452e;
}

.desc span {
  font-size: 20px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: -10%;
  text-align: center;
  color: #6b452e;
}

.desc-toggle {
  text-align: start !important;
}

.author {
  font-size: 16px;
}

.price-text {
  font-size: 16px;
  font-weight: 400;
}

.price-from {
  font-weight: 500 !important;
}

.price span {
  font-size: 16px;
  font-weight: 300;
}

.colors {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 10px;
  width: 100%;
  overflow-y: hidden;
  overflow-x: scroll;
}

.colors img {
  transition: all 500ms ease;
  border: 1px solid transparent;
}

.colors img:hover {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border: 1px solid #6b452e;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}

.modal-image {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
}

.modal-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 30px;
  cursor: pointer;
  z-index: 1001;
}

/* Адаптация для мобильных устройств */
.mobile-card.card-toggle {
  width: 100%;
}

.mobile-info {
  width: 100%;
  gap: 15px;
}

.mobile-h1 {
  font-size: 28px;
  line-height: 32px;
}
/* Адаптация для планшетов */
.tablet-card.card-toggle {
  width: 50%;
}

.tablet-info {
  width: 100%;
  gap: 20px;
}

.tablet-h1 {
  font-size: 32px;
  line-height: 36px;
}


/* Плавные переходы вокруг breakpoint 1140px */
@media (min-width: 1130px) and (max-width: 1150px) {
  .card-toggle {
    width: 48%;
  }
  
  .h1-toggle {
    font-size: 36px;
  }
  
  .wrap-image img {
    max-height: 350px;
  }
}
</style>