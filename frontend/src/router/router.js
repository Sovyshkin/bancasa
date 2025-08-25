import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/views/HomePage.vue"),
      name: "main",
    },
    {
      path: "/menu",
      component: () => import("@/views/MenuPage.vue"),
      name: "menu",
    },
    {
      path: "/catalog",
      component: () => import("@/views/CatalogPage.vue"),
      name: "catalog",
    },
  ],
});

export default router;
