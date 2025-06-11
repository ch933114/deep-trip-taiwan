<template>
  <div class="relative">
    <section>
      <Banner></Banner>
    </section>
    <section>
      <Dashboard></Dashboard>
    </section>
    <section>
      <News></News>
    </section>
    <section>
      <SocialStory></SocialStory>
    </section>
    <section>
      <TripIntro></TripIntro>
    </section>
    <section>
      <NavArea></NavArea>
    </section>
    <button
      v-show="showButton"
      @click="scrollToTop"
      class="fixed bottom-3 right-6 bg-black text-white px-4 py-2 rounded-full shadow-lg hover:bg-secondary transition-opacity duration-300"
    >
      ⬆ 回到頂部
    </button>
    <a href="#" class="hidden lg:block lg:fixed lg:bottom-[60px] lg:right-6 lg:animate-spin-slow"
      ><img src="/images/contact_us.svg" alt="聯絡我們" class="w-[100px]"
    /></a>
  </div>
</template>
<script setup>
import Banner from '../components/Banner.vue'
import Dashboard from '../components/Dashboard.vue'
import News from '../components/News.vue'
import SocialStory from '../components/SocialStory.vue'
import NavArea from '../components/NavArea.vue'
import TripIntro from '@/components/TripIntro.vue'

import { onBeforeUnmount, onMounted, ref } from 'vue'

const showButton = ref(false)
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
const handleScroll = () => {
  showButton.value = window.scrollY > 300
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
