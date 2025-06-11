<template>
  <div class="p-6 max-w-[1296px] mx-auto">
    <img
      src="/images/trip_japan.jpg"
      alt=""
      class="max-w-full w-[100vw] mx-auto h-[60vh] rounded-[10px] object-center mb-7"
    />
    <div v-if="article">
      <div class="mb-12 flex flex-col gap-4">
        <h2 class="text-3xl font-bold">{{ article.title }}</h2>
        <!-- 文章基本資料 -->
        <div class="text-[18px] flex gap-3">
          <img src="/images/user_icon.png" alt="使用者大頭貼" class="w-[30px]" />
          <span>{{ article.author }}</span
          ><br />
          <span>發布日期：{{ article.publishedAt }}</span>
        </div>
        <div class="flex gap-2">
          <router-link
            v-for="tag in article.tags"
            :key="tag"
            :to="{ path: '/trip-intro', query: { tag } }"
            class="bg-primary-light text-xs text-grey p-1 rounded-[2px] cursor-pointer"
          >
            {{ tag }}
          </router-link>
        </div>
        <div class="flex flex-col gap-2">
          <h3 class="text-lg font-bold">旅程摘要</h3>
          <p>{{ article.summary }}</p>
        </div>
        <!-- 單一天數旅程紀錄 -->
        <div class="flex flex-col gap-2" v-for="(dayinfo, index) in article.itinerary">
          <h3 class="text-lg font-bold">第{{ index + 1 }}天 : {{ dayinfo.title }}</h3>
          <p>{{ dayinfo.description }}</p>
          <div class="flex gap-2">
            <span v-for="spot in dayinfo.spots" class="bg-primary-light p-1 rounded-[5px]"
              >#{{ spot }}</span
            >
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <router-link
          :to="`/trip-intro`"
          class="font-bold p-3 rounded-[5px] border border-primary hover:bg-primary-light"
          >返回列表</router-link
        >
      </div>
    </div>
    <div v-else>
      <p>找不到這篇文章</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTripInfoStore } from '@/stores/tripInfo'

const route = useRoute()
const articleId = route.params.id

const tripStore = useTripInfoStore()
const article = ref(null)

onMounted(() => {
  tripStore.loadArticles().then(() => {
    article.value = tripStore.articles.find((a) => String(a.id) === String(articleId))
  })
})
</script>
