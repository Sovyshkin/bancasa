<script setup>
import { useMainStore } from "../stores/main.ts";
import { onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const mainStore = useMainStore();
const route = useRoute();
const router = useRouter();

// Определяем, пришли ли мы из поиска
const isFromSearch = computed(() => route.query.fromSearch === "true");

const selectSubcategory = async (id) => {
  try {
    await mainStore.getTypes(id);
  } catch (err) {
    console.log(err);
  }
};

const goCatalog = (type_id) => {
  try {
    router.push({
      name: "catalog",
      query: { type_id, fromSearch: isFromSearch.value },
    });
  } catch (err) {
    console.log(err);
  }
};

const restoreStateFromSearch = () => {
  const searchParams = route.query;

  if (searchParams.searchResultType && searchParams.searchResultId) {
    const resultType = searchParams.searchResultType;
    const resultId = searchParams.searchResultId;

    switch (resultType) {
      case "category": {
        // Если это категория, загружаем ее подкатегории
        mainStore.getSubcategories(resultId);
        break;
      }

      case "subcategory": {
        // Если это подкатегория, находим родительскую категорию и загружаем типы
        const subcategoryResult = mainStore.searchResults.find(
          (item) => item.type === "subcategory" && item.id == resultId
        );

        if (subcategoryResult && subcategoryResult.category) {
          const categoryId = subcategoryResult.category.data.id;
          mainStore.getSubcategories(categoryId).then(() => {
            mainStore.getTypes(resultId);
          });
        }
        break;
      }

      case "type": {
        // Если это тип, находим родительские категории и подкатегории
        const typeResult = mainStore.searchResults.find(
          (item) => item.type === "type" && item.id == resultId
        );

        if (typeResult && typeResult.subcategory) {
          const subcategoryData = typeResult.subcategory.data;
          const categoryId = subcategoryData.category.data.id;

          mainStore.getSubcategories(categoryId).then(() => {
            mainStore.getTypes(subcategoryData.id).then(() => {
              // Переходим сразу в каталог
              goCatalog(resultId);
            });
          });
        }
        break;
      }
    }
  }
};

// // Обработчик для переходов из поиска
// const handleSearchResultNavigation = (result) => {
//   switch (result.type) {
//     case "category": {
//       router.push({
//         name: "menu",
//         query: {
//           category_id: result.id,
//           fromSearch: "true",
//           searchResultType: result.type,
//           searchResultId: result.id,
//         },
//       });
//       break;
//     }

//     case "subcategory": {
//       // Для подкатегории нам нужно знать ID родительской категории
//       const categoryId = result.category?.data?.id;
//       if (categoryId) {
//         router.push({
//           name: "menu",
//           query: {
//             category_id: categoryId,
//             fromSearch: "true",
//             searchResultType: result.type,
//             searchResultId: result.id,
//           },
//         });
//       }
//       break;
//     }

//     case "type": {
//       const subcategoryData = result.subcategory?.data;
//       if (subcategoryData) {
//         const categoryId = subcategoryData.category.data.id;
//         router.push({
//           name: "menu",
//           query: {
//             category_id: categoryId,
//             fromSearch: "true",
//             searchResultType: result.type,
//             searchResultId: result.id,
//           },
//         });
//       }
//       break;
//     }
//   }
// };
// Отслеживаем изменения параметров маршрута
watch(
  () => route.query,
  (newQuery) => {
    if (newQuery.fromSearch === "true") {
      restoreStateFromSearch();
    } else if (newQuery.category_id && !isFromSearch.value) {
      // Обычная загрузка без поиска
      mainStore.getSubcategories(newQuery.category_id);
    }
  }
);

onMounted(() => {
  const categoryId = route.query.category_id;

  if (isFromSearch.value) {
    // Восстанавливаем состояние из поиска
    restoreStateFromSearch();
  } else if (categoryId) {
    // Обычная загрузка
    mainStore.getSubcategories(categoryId);
  }
});
</script>
<template>
  <div class="menu">
    <ul class="subcategories">
      <li
        class="nav-item"
        @click="selectSubcategory(item.documentId)"
        v-for="item in mainStore.subcategories"
        :key="item.id"
        :class="{
          item_active: item.documentId == mainStore.subcategory.documentId,
        }"
      >
        {{ item.name }}
      </li>
    </ul>
    <ul class="types" v-if="mainStore.types?.length">
      <li
        class="nav-item"
        @click="goCatalog(item.documentId)"
        v-for="item in mainStore.types"
        :key="item.id"
      >
        {{ item.name }}
      </li>
    </ul>
    <div class="wrap-img">
      <img
        v-if="mainStore.category.image"
        :src="`http://localhost:1337${mainStore.category.image.url}`"
        alt=""
      />
    </div>
  </div>
</template>
<style scoped>
.menu {
  padding-top: 10vh;
  width: 100%;
  display: flex;
}

.subcategories,
.types {
  width: 25%;
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  height: 90vh;
  overflow-x: hidden;
  overflow-y: scroll;
  border-right: 1px solid #7f6e5e;
}

.nav-item {
  width: fit-content;
  text-transform: uppercase;
  color: #7f6e5e;
  font-weight: 300;
  font-size: 14px;
  letter-spacing: 1px;
  cursor: pointer;
  position: relative;
}

.nav-item::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background-color: #736456;
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}

.item_active {
  border-bottom: 1px solid #736456;
}

.wrap-img {
  flex: 1;
  height: 90vh;
  position: relative;
  overflow: hidden;
}

.wrap-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 2;
  transition: transform 0.5s ease;
}

@media (max-width: 1080px) {
  .wrap-img {
    display: none;
  }
  .subcategories,
  .types {
    width: 100%;
  }
}
</style>
