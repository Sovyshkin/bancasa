import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useMainStore = defineStore("main", () => {
  const components = ref([]);
  const category = ref({});
  const categories = ref([]);
  const subcategories = ref([]);
  const subcategory = ref({});
  const type = ref({});
  const types = ref([]);
  const cards = ref([]);
  const isLoading = ref(false);
  const email = ref("");
  const showSuccessMessage = ref(false);
  const toggleCatalogActive = ref(true);
  const searchQuery = ref("");
  const searchResults = ref([]);
  const isSearching = ref(false);

  const performSearch = async (query) => {
    if (!query.trim()) {
      searchResults.value = [];
      return;
    }

    isSearching.value = true;
    searchQuery.value = query;

    try {
      const [categoriesResponse, subcategoriesResponse, typesResponse] =
        await Promise.all([
          // Категории
          axios.get(
            `/categories?filters[name][$containsi]=${query}&populate=*`
          ),
          // Подкатегории
          axios.get(
            `/subcategories?filters[name][$containsi]=${query}&populate=*`
          ),
          // Типы
          axios.get(`/types?filters[name][$containsi]=${query}&populate=*`),
        ]);

      const results = [
        ...categoriesResponse.data.data.map((item) => ({
          ...item,
          type: "category",
        })),
        ...subcategoriesResponse.data.data.map((item) => ({
          ...item,
          type: "subcategory",
        })),
        ...typesResponse.data.data.map((item) => ({
          ...item,
          type: "type",
        })),
      ];

      searchResults.value = results;
      console.log('Результат поиска',results);
      
    } catch (error) {
      console.error("Search error:", error);
      searchResults.value = [];
    } finally {
      isSearching.value = false;
    }
  };

  const clearSearch = () => {
    searchQuery.value = "";
    searchResults.value = [];
    isSearching.value = false;
  };

  const getComponents = async () => {
    try {
      console.log(axios.defaults.baseURL);
      const res = await axios.get("home-page?populate=*");
      components.value = res.data.data;
      
      console.log(components.value);
    } catch (err) {
      console.log(err);
    }
  };

  const getCategories = async () => {
    try {
      let response = await axios.get("categories?populate=*");
      console.log(response);
      categories.value = response.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getSubcategories = async (id) => {
    try {
      let response = await axios.get(`categories/${id}?populate=*`);
      subcategories.value = response.data.data.subcategories;
      category.value = response.data.data;
      console.log(category.value);
    } catch (err) {
      console.log(err);
    }
  };

  const getTypes = async (id) => {
    try {
      let response = await axios.get(`subcategories/${id}?populate=*`);
      types.value = response.data.data.types;
      subcategory.value = response.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getCards = async (id) => {
    try {
      isLoading.value = true;
      let response = await axios.get(`types/${id}?populate[cards][populate]=*`);
      cards.value = response.data.data.cards;
      type.value = response.data.data;
    } catch (err) {
      console.log(err);
    } finally {
      isLoading.value = false;
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const saveEmail = async () => {
    if (!validateEmail(email.value)) {
      alert("Please enter the correct email address.");
      return;
    }

    try {
      if (email.value) {
        let response = await axios.post(`/emails`, {
          data: {
            name: email.value,
          },
        });
        console.log(response);
        showSuccessMessage.value = true;
      }

      setTimeout(() => {
        showSuccessMessage.value = false;
        email.value = "";
      }, 3000);
    } catch (error) {
      console.error("Error saving email:", error);
      alert("An error has occurred, please try again later");
    }
  };

  const toggleCatalog = () => {
    try {
      toggleCatalogActive.value = !toggleCatalogActive.value;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    showSuccessMessage,
    email,
    isLoading,
    category,
    categories,
    subcategories,
    subcategory,
    types,
    type,
    cards,
    components,
    toggleCatalogActive,
    searchQuery,
    searchResults,
    isSearching,
    performSearch,
    clearSearch,
    toggleCatalog,
    getComponents,
    getCategories,
    getSubcategories,
    getTypes,
    saveEmail,
    getCards,
  };
});
