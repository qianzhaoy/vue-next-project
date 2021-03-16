import { createRouter, createWebHistory } from "vue-router";
import { routes } from './routes'
import { useRouterBeforeEach, useRouterAfterEach } from './middleware'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

useRouterBeforeEach(router)
useRouterAfterEach(router)

export default router;
