import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Form from '../views/Form.vue';
import Grid from '../views/Grid.vue';
import Proxy from '../views/Proxy.vue';
import Function from "../views/Function.vue";
import Promise from "../views/Promise.vue";
import ClientCheck from "@/views/ClientCheck.vue";
import Anchor from '@/views/Anchor.vue'

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
    {
      path: '/promise',
      name: "promise",
      component: Promise,
    },
    {
      path: '/client-check',
      name: "clientCheck",
      component: ClientCheck,
    },
    {
      path: '/anchor',
      name: "anchore",
      component: Anchor,
    },
    {
      path: '/dom',
      name: 'dom',
      component: () => import('@/views/Dom.vue')
    },
  ],
});

export default router;
