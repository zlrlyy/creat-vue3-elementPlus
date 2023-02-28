import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Form from '../views/Form.vue';
import Grid from '../views/Grid.vue';
import Proxy from '../views/Proxy.vue';
import Function from "../views/Function.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: '/form',
      name: "form",
      component: Form,
    },
    {
      path: '/grid',
      name: "grid",
      component: Grid,
    },
    {
      path: '/proxy',
      name: "proxy",
      component: Proxy,
    },
    {
      path: '/function',
      name: "function",
      component: Function,
    },
  ],
});

export default router;
