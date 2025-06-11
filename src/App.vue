<template>
  <AppHeader class="absolute right-0 z-20"></AppHeader>
  <section>
    <router-view />
  </section>
  <AppFooter></AppFooter>
</template>

<script setup>
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
</script>
