<template>
  <router-view #default="{route,Component}">
    <!-- <transition :enter-active-class="`animate__animated ${route.meta.transition}`"> -->
      <component :is="Component"></component>
    <!-- </transition> -->
  </router-view>
</template>

<script setup lang="ts">
</script>
  
<style scoped lang="less">
// * {
//   padding: 0;
//   margin: 0;
// }

// html,
// body,
// #app {
//   height: 100%;
//   overflow: hidden;
// }

// .logo {
//   height: 6em;
//   padding: 1.5em;
//   will-change: filter;
// }

// .logo:hover {
//   filter: drop-shadow(0 0 2em #646cffaa);
// }

// .logo.vue:hover {
//   filter: drop-shadow(0 0 2em #42b883aa);
// }
</style>
