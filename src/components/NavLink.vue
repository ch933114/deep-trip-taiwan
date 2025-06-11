<template>
  <router-link :to="to" v-slot="{ isActive }" class="relative inline-block px-8 py-3 group">
    <span><slot /></span>
    <span
      :class="[
        'absolute left-0 bottom-0 h-[2px] bg-white transition-all duration-300 w-0 group-hover:w-full',
      ]"
    ></span>
  </router-link>
</template>

<script setup>
defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
})
</script>
