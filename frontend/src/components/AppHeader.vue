<script setup>
import { useMainStore } from "../stores/main.ts";
import { computed, ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const mainStore = useMainStore();
const isMobileMenuOpen = ref(false);
const route = useRoute();
const router = useRouter();
const searchInput = ref('');

const info = computed(() => {
  return mainStore.components;
});

// Отслеживание изменений в поисковом запросе
watch(searchInput, (newValue) => {
  if (newValue.length > 2) {
    mainStore.performSearch(newValue);
  } else {
    mainStore.clearSearch();
  }
});

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const isHomePage = computed(() => {
  return route.name === "main";
});

const goHome = () => {
  try {
    if (isMobileMenuOpen.value) {
      toggleMobileMenu();
    }
    mainStore.clearSearch();
    router.push({ name: "main" });
  } catch (err) {
    console.log(err);
  }
};

const goMenu = (id) => {
  try {
    if (isMobileMenuOpen.value) {
      toggleMobileMenu();
    }
    mainStore.types = [];
    mainStore.clearSearch();
    router.push({ name: "menu", query: { category_id: id } });
  } catch (err) {
    console.log(err);
  }
};

// Навигация к результату поиска
const navigateToSearchResult = (result) => {
  mainStore.clearSearch();
  searchInput.value = '';
  
  if (isMobileMenuOpen.value) {
    toggleMobileMenu();
  }
  switch (result.type) {
    case 'category':
      router.push({ 
        name: 'menu', 
        query: { category_id: result.documentId || result.id } 
      });
      break;
    case 'subcategory':
      // Предполагаем, что у подкатегории есть ссылка на родительскую категорию
      router.push({ 
        name: 'menu', 
        query: { 
          category_id: result.category?.documentId || result.category?.id,
          subcategory_id: result.documentId || result.id
        } 
      });
      break;
    case 'type':
      // Предполагаем, что у типа есть ссылки на категорию и подкатегорию
      router.push({ 
        name: 'menu', 
        query: { 
          category_id: result.category?.documentId || result.category?.id,
          subcategory_id: result.subcategory?.documentId || result.subcategory?.id,
          type_id: result.documentId || result.id
        } 
      });
      break;
  }
};

onMounted(async () => {
  await mainStore.getCategories();
});
</script>

<template>
  <header class="header">
    <div class="logo" @click="goHome()">
      <img
        v-if="info.header_logo && isHomePage"
        :src="`http://38.180.141.64${info.header_logo.url}`"
        alt=""
      />
      <img
        v-if="info.header_logo_2 && !isHomePage"
        :src="`http://38.180.141.64${info.header_logo_2.url}`"
        alt=""
      />
    </div>

    <nav class="header__nav desktop-nav">
      <ul class="header__nav-list">
        <li
          class="nav-item"
          @click="goMenu(item.documentId)"
          v-for="item in mainStore.categories"
          :key="item.id"
          :class="{
            home_page: isHomePage,
            item_active:
              item.documentId == mainStore.category.documentId && !isHomePage,
          }"
        >
          {{ item.name }}
        </li>
      </ul>
    </nav>

    <div class="actions desktop-actions">
      <div class="lang">
        <span :class="{ home_page: isHomePage }">EN</span>
        <img v-if="isHomePage" src="../assets/arrow-down.svg" alt="" />
        <img v-else src="../assets/arrow-down-2.svg" alt="" />
      </div>
      <img
        v-if="info.header_search && isHomePage"
        :src="`http://38.180.141.64${info.header_search.url}`"
        alt="search"
        @click="toggleMobileMenu"
      />
      <img
        v-if="info.header_search_2 && !isHomePage"
        :src="`http://38.180.141.64${info.header_search_2.url}`"
        alt="search"
        @click="toggleMobileMenu"
      />
      <img
        v-if="info.header_user && isHomePage"
        :src="`http://38.180.141.64${info.header_user.url}`"
        alt="user"
      />
      <img
        v-if="info.header_user_2 && !isHomePage"
        :src="`http://38.180.141.64${info.header_user_2.url}`"
        alt="user"
      />
      <img
        v-if="info.header_shop && isHomePage"
        :src="`http://38.180.141.64${info.header_shop.url}`"
        alt="shop"
      />
      <img
        v-if="info.header_shop_2 && !isHomePage"
        :src="`http://38.180.141.64${info.header_shop_2.url}`"
        alt="shop"
      />
    </div>

    <div
      class="mobile-menu-btn"
      :class="{ active: isMobileMenuOpen }"
      @click="toggleMobileMenu"
    >
      <span class="hamburger-line" :class="{ home_page_menu: isHomePage }"></span>
      <span class="hamburger-line" :class="{ home_page_menu: isHomePage }"></span>
      <span class="hamburger-line" :class="{ home_page_menu: isHomePage }"></span>
    </div>

    <div class="mobile-menu" :class="{ active: isMobileMenuOpen }">
      <div class="mobile-menu__content">
        <div class="mobile-menu__header">
          <div class="logo" @click="goHome()">
            <img
              v-if="info.header_logo"
              :src="`http://38.180.141.64${info.header_logo_mobile.url}`"
              alt=""
            />
          </div>
        </div>

        <div class="mobile-search">
          <img src="@/assets/search.svg" alt="" />
          <input
            type="text"
            placeholder="Type to Search"
            class="search-input"
            v-model="searchInput"
          />
          <div class="mobile-search-results" v-if="mainStore.searchResults.length">
            <div
              v-for="result in mainStore.searchResults"
              :key="result.id"
              class="search-result-item"
              @click="navigateToSearchResult(result)"
            >
              {{ result.name }}
            </div>
          </div>
        </div>

        <nav class="mobile-nav">
          <ul class="mobile-nav__list">
            <li
              class="mobile-nav__item"
              v-for="item in mainStore.categories"
              :key="item.id"
              @click="goMenu(item.documentId)"
            >
              {{ item.name }} <span class="arrow">></span>
            </li>
          </ul>
        </nav>

        <!-- Язык -->
        <div class="mobile-lang">EN</div>
      </div>
    </div>
  </header>
</template>


<style scoped>
header {
  width: 100%;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  height: 10vh;
  position: absolute;
  z-index: 1000;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

img {
  cursor: pointer;
}

.header__nav-list {
  display: flex;
  align-items: center;
  gap: 15px;
}

.nav-item {
  font-size: 14px;
  cursor: pointer;
  position: relative;
  text-transform: uppercase;
  color: #7f6e5e;
}

.item_active {
  border-bottom: 1px solid #736456;
}

.nav-item::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background-color: #7f6e5e;
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}

.actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.lang {
  display: flex;
  align-items: center;
  gap: 5px;
}

.lang span {
  color: #7f6e5e;
  font-size: 14px;
}

/* Мобильное меню */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  z-index: 1001;
  border-radius: 3px;
  position: relative;
}

.hamburger-line {
  display: block;
  width: 22px;
  height: 2px;
  background-color: #736456;
  transition: all 0.3s ease;
  transform-origin: center;
  position: absolute;
}

.home_page_menu {
  background-color: #fff;
}

.hamburger-line:nth-child(1) {
  top: 9px;
}

.hamburger-line:nth-child(2) {
  top: 15px;
}

.hamburger-line:nth-child(3) {
  top: 21px;
}

/* Анимация в крестик */
.mobile-menu-btn.active .hamburger-line:nth-child(1) {
  transform: rotate(45deg);
  top: 15px;
  background-color: #736456;
}

.mobile-menu-btn.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg);
  top: 15px;
  background-color: #736456;
}

/* Полноэкранное мобильное меню */
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  color: #736456;
  overflow-y: auto;
}

.mobile-menu.active {
  opacity: 1;
  visibility: visible;
}

.mobile-menu__content {
  padding: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.mobile-menu__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.mobile-menu__header .logo img {
  max-height: 40px;
  width: auto;
}

.mobile-menu__close {
  font-size: 30px;
  color: #736456;
  background: transparent;
  border: none;
  cursor: pointer;
  line-height: 1;
}

.mobile-search {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 40px;
  background-color: #ebebeb;
  padding: 10px 15px;
}

.search-input {
  width: 100%;
  background: transparent;
  border: none;
  color: #9e9793;
  font-size: 16px;
  outline: none;
}

.search-input::placeholder {
  color: #9e9793;
}

.mobile-nav__list {
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;
}

.mobile-nav__item {
  font-size: 18px;
  padding: 12px 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #736456;
}

.arrow {
  font-size: 24px;
  color: #736456;
}

.mobile-lang {
  font-size: 16px;
  text-transform: uppercase;
  margin-top: auto;
  padding: 20px 0;
  text-align: center;
  color: #736456;
  border-top: 1px solid #736456;
}

.home_page {
  color: #fff !important;
}

.home_page::after {
  background-color: #fff;
}

.desktop-search {
  position: relative;
  margin-right: 20px;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-top: none;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
}

.search-result-item {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  font-size: 18px;
  color: #736456;
  text-transform: uppercase;
}

.search-result-item:hover {
  background-color: #f5f5f5;
}

.mobile-search {
  position: relative;
}

.mobile-search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
}

@media (max-width: 1210px) {
  .desktop-search {
    display: none;
  }
}

@media (max-width: 1023px) {
  header {
    padding: 10px 20px;
  }

  .logo img {
    height: 37px;
  }
}

/* Адаптивность */
@media (max-width: 1210px) {
  .desktop-nav,
  .desktop-actions {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }
}

@media (max-width: 480px) {
  .mobile-menu__content {
    padding: 30px 20px;
  }

  .mobile-nav__item {
    font-size: 16px;
  }

  .mobile-menu__close {
    font-size: 25px;
  }
}
</style>
