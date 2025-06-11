<template>
  <div class="flex flex-col justify-center items-center" data-aos="fade-up">
    <img
      src="/images/dashboard_logo.svg"
      alt="中文logo"
      class="w-full max-w-[250px] md:max-w-[400px] py-20"
    />
    <div class="bg-accent1 w-full flex justify-center gap-4 sm:gap-8 py-16 px-4 font-Han">
      <div
        class="bg-white w-2/5 sm:w-1/4 flex flex-col items-center justify-center px-2 py-8 md:px-8 rounded-[15px] font-bold"
      >
        <h3 class="text-md sm:text-2xl md:text-3xl mb-8">社群成立</h3>
        <p
          class="flex flex-col items-center justify-center text-2xl sm:text-3xl md:text-[50px] font-bold"
        >
          {{ daysSinceCreated }}<span class="font-bold">天</span>
        </p>
      </div>
      <div
        class="bg-white w-2/5 sm:w-1/4 flex flex-col items-center justify-center px-2 py-8 md:px-8 rounded-[15px] font-bold"
      >
        <h3 class="text-md sm:text-2xl md:text-3xl mb-8">旅行夥伴</h3>
        <p
          class="flex flex-col items-center justify-center text-2xl sm:text-3xl md:text-[50px] font-bold"
        >
          {{ memberCount }}<span class="font-bold">位</span>
        </p>
      </div>
      <div
        class="bg-white w-2/5 sm:w-1/4 flex flex-col items-center justify-center px-2 py-8 md:px-8 rounded-[15px] font-bold"
      >
        <h3 class="text-md sm:text-2xl md:text-3xl mb-8">貢獻旅程</h3>
        <p
          class="flex flex-col items-center justify-center text-2xl sm:text-3xl md:text-[50px] font-bold"
        >
          {{ articleLength }}<span class="font-bold">篇</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useTripInfoStore } from '@/stores/tripInfo'
const userStore = useUserStore()
const tripInfoStore = useTripInfoStore()
const memberCount = userStore.fakeUsers.length
const createTime = userStore.systemCreateTime
const articleLength = computed(() => tripInfoStore.articles.length)
const now = ref(new Date())

onMounted(() => {
  tripInfoStore.loadArticles()
})

// 計算天數差距
const daysSinceCreated = computed(() => {
  const oneDayMs = 1000 * 60 * 60 * 24 // 一天的毫秒數
  const diffMs = now.value.getTime() - createTime.getTime()
  return Math.floor(diffMs / oneDayMs)
})
</script>
