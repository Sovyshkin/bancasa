<script setup>
import { useMainStore } from "../stores/main.ts";
import { useRoute } from "vue-router";
import { onMounted, watch, ref, onUnmounted, computed } from "vue";
import AppCard from "@/components/AppCard.vue";

const mainStore = useMainStore();
const route = useRoute();
const windowWidth = ref(window.innerWidth);

// Функция для обновления ширины окна
const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

// Вычисляемое свойство для лучшего управления адаптацией
const isMobile = computed(() => windowWidth.value < 768);
const isTablet = computed(() => windowWidth.value >= 768 && windowWidth.value < 1024);
const isSmallDesktop = computed(() => windowWidth.value >= 1024 && windowWidth.value < 1140);
const isLargeDesktop = computed(() => windowWidth.value >= 1140);

onMounted(() => {
  let id = route.query.type_id;
  if(mainStore.cards.length == 0) {
    mainStore.getCards(id);
  }
  
  // Устанавливаем начальное значение
  mainStore.toggleCatalogActive = window.innerWidth < 1140;
  
  // Добавляем слушатель изменения размера окна
  window.addEventListener('resize', updateWindowWidth);
});

// Следим за изменением ширины окна
watch(windowWidth, (newWidth) => {
  mainStore.toggleCatalogActive = newWidth < 1140;
});

// Убираем слушатель при размонтировании компонента
onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth);
});
</script>

<template>
  <div class="header-catalog">
    <div class="title">
      <h1>{{ mainStore.type.name }}</h1>
      <h2>{{ mainStore.type.subtitle }}</h2>
    </div>
    <img
      class="toggler"
      src="@/assets/toggler.svg"
      @click="mainStore.toggleCatalog()"
      alt="toggler"
      v-if="isLargeDesktop"
    />
  </div>
  <div class="catalog" :class="{ 
    'toggleActive': mainStore.toggleCatalogActive,
    'small-desktop': isSmallDesktop,
    'tablet': isTablet,
    'mobile': isMobile
  }">
    <AppCard v-for="card in mainStore.cards" :key="card.id" :card="card" />
  </div>
</template>

<style scoped>
.header-catalog {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  padding-top: 10vh;
  position: relative;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  color: #6b452e;
  font-size: 32px;
  text-transform: uppercase;
  text-align: center;
}

h2 {
  color: #6b452e;
  font-size: 14px;
  text-align: center;
}

.toggler {
  position: absolute;
  right: 40px;
  height: 20px;
  width: 20px;
  cursor: pointer;
}

.catalog {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 40px 20px;
  max-width: 1440px;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.toggleActive {
  flex-direction: row;
  flex-wrap: wrap;
}

/* Стили для небольших десктопов (1024px - 1139px) */
.small-desktop.toggleActive .card-toggle {
  width: 49%;
}

/* Стили для планшетов (768px - 1023px) */
.tablet.toggleActive .card-toggle {
  width: 49%;
}

.tablet .header-catalog {
  padding: 0 20px;
  padding-top: 8vh;
}

.tablet h1 {
  font-size: 28px;
}

/* Стили для мобильных устройств (до 767px) */
.mobile.toggleActive .card-toggle {
  width: 100%;
}

.mobile .header-catalog {
  padding: 0 15px;
  padding-top: 6vh;
  flex-direction: column;
  gap: 15px;
}

.mobile h1 {
  font-size: 24px;
  text-align: center;
}

.mobile h2 {
  font-size: 12px;
  text-align: center;
}

.mobile .catalog {
  padding: 20px 10px;
  gap: 30px;
}

@media (max-width: 1140px) {
  .toggler {
    display: none;
  }
}

/* Плавные переходы для предотвращения резких изменений */
@media (min-width: 1130px) and (max-width: 1150px) {
  .catalog.toggleActive .card-toggle {
    width: 48%;
  }
}

@media (max-width: 1150px) {
  .catalog {
    gap: 15px;
    padding: 20px 10px;
  }
}
</style>