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
    {
      path: '/event',
      name: 'event',
      component: () => import('@/views/Event.vue')
    },
    {
      path: '/animation',
      name: 'animation',
      component: () => import('@/views/Animation.vue')
    },
    {
      path: '/canvas2d',
      name: 'canvas2d',
      component: () => import('@/views/Canvas2D.vue')
    },
    {
      path: '/canvas3d',
      name: 'canvas3d',
      component: () => import('@/views/Canvas3D.vue')
    },
    {
      path: '/scroll',
      name: 'scroll',
      component: () => import('@/views/Scroll.vue')
    }, {
      path: '/formBasicInput',
      name: 'formBasicInput',
      component: () => import('@/views/FormBaseInput.vue')
    },
    {
      path: '/formBasicSelect',
      name: 'formBasicSelect',
      component: () => import('@/views/FormBaseSelect.vue')
    },
    {
      path: '/atomics',
      name: 'atomics',
      component: () => import('@/views/Atomics.vue')
    },
    {
      path: '/xdm',
      name: 'xdm',
      component: () => import('@/views/XDM.vue')
    },
    {
      path: '/encode',
      name: 'encode',
      component: () => import('@/views/Encode.vue')
    },
    {
      path: '/fileApi',
      name: 'fileApi',
      component: () => import('@/views/FileApi.vue')
    },
    {
      path: '/mediaApi',
      name: 'mediaApi',
      component: () => import('@/views/MediaApi.vue')
    },
    {
      path: '/dragApi',
      name: 'dragApi',
      component: () => import('@/views/DragApi.vue')
    }, {
      path: '/notifications',
      name: 'notifications',
      component: () => import('@/views/Notifications.vue')
    },
    {
      path: '/streams',
      name: 'streams',
      component: () => import('@/views/Streams.vue')
    },
    {
      path: '/performance',
      name: 'performance',
      component: () => import('@/views/Performance.vue')
    },
    {
      path: '/template',
      name: 'template',
      component: () => import('@/views/HTMLTemplate.vue')
    },
    {
      path: '/shadowDom',
      name: 'shadowDom',
      component: () => import('@/views/Shadow.vue')
    },
    {
      path: '/CustomDom',
      name: 'CustomDom',
      component: () => import('@/views/CustomDom.vue')
    },
    {
      path: '/Crypto',
      name: 'Crypto',
      component: () => import('@/views/Crypto.vue')
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('@/views/Error.vue')
    },
    {
      path: '/XML',
      name: 'XML',
      component: () => import('@/views/XML.vue')
    }
  ],
});

export default router;
