// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("../views/Home.vue") },
  { path: "/home", component: () => import("../views/Home.vue") },
  { path: "/about", component: () => import("../views/About.vue") },
  { path: "/services", component: () => import("../views/Services.vue") },
  { path: "/contact", component: () => import("../views/Contact.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // If the user used browser back/forward
    if (savedPosition) {
      return savedPosition
    }

    // Scroll to top on route change
    return { top: 0, left: 0, behavior: 'smooth' }
  }
});

export default router;
