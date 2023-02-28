
<template>
  <div>
    <router-link v-for="item in routers" :to="item.path" class="route">{{item.name}}</router-link>
  </div>
  <router-view />
</template>

<script lang="ts" setup>
import {useRouter} from 'vue-router';
const router = useRouter();
const routers = router.options.routes;
</script>

<style>
.route{
  margin-bottom: 20px;
  display: inline-block;
  text-align: center;
  width:100px;
  font-size: 20px;
}
</style>