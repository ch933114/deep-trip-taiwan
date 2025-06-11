<template>
  <div class="relative bg-[url('/images/banner.png')] bg-cover bg-center h-[70vh] w-full">
    <div class="absolute left-0 top-0 h-[70vh] w-full bg-[black] bg-opacity-70 z-5"></div>
    <div class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 text-center">
      <h1 class="text-white text-[60px] mb-6">我的旅程</h1>
      <h2 class="text-white text-3xl">分享你的獨家旅程</h2>
    </div>
  </div>
  <div class="max-w-[1296px] mx-auto px-2">
    <div class="flex justify-center my-6">
      <div class="inline-block border border-secondary py-2 px-3 rounded-[40px]">
        <button
          type="button"
          class="bg-primary text-white rounded-[20px] py-2 px-4 mr-2"
          @click="showModal = true"
        >
          選擇類別
        </button>
        <input
          v-model="keyword"
          type="text"
          placeholder="請輸入標題關鍵字"
          class="p-2 outline-none"
        />
      </div>
    </div>
    <PopupModal :visible="showModal" @close="showModal = false">
      <template #content>
        <h2 class="text-2xl font-semibold py-2">旅程篩選</h2>
        <hr class="bg-primary h-[1px] border-0 mb-4" />

        <!-- 一般類別標籤 -->
        <div class="mb-4">
          <h3 class="text-lg font-medium mb-2">一般類別標籤</h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tag in categoryTags"
              :key="tag"
              :class="[
                'px-3 py-1 rounded-full border transition',
                selectedCategory.includes(tag)
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100',
              ]"
              @click="toggleCategory(tag)"
            >
              {{ tag }}
            </button>
          </div>
        </div></template
      >
      <template #button>
        <!-- 確認篩選 -->
        <div class="text-right">
          <button
            class="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition"
            @click="applyFilters"
          >
            確認篩選
          </button>
        </div>
      </template>
    </PopupModal>
    <div>
      <router-link :to="`/my-trip/create`" class="bg-primary text-white px-4 py-2 rounded"
        >新增旅程</router-link
      >
    </div>
    <!-- 卡牌列表切換 -->
    <div>
      <div class="flex justify-end items-center my-8">
        <button
          class="p-2"
          :class="{ 'bg-primary-light ': displayType === 'card' }"
          @click="displayCardHandler"
        >
          <img src="/images/grid.svg" class="w-[30px]" alt="表格" />
        </button>
        <button
          class="p-2"
          :class="{ 'bg-primary-light': displayType === 'list' }"
          @click="displayListHandler"
        >
          <img src="/images/list.svg" class="w-[30px]" alt="列表" />
        </button>
      </div>

      <!-- 卡牌排版 -->
      <div class="">
        <TripCard :displayType="displayType" :filteredArticles="filteredMyArticles">
          <template #default="{ article }">
            <!-- 查看更多 -->
            <div class="flex gap-2 justify-end">
              <button
                @click="deleteArticleHandler(article.id)"
                class="font-bold relative text-danger hover:text-red-800 underline-animate"
              >
                刪除文章
              </button>
              <router-link
                :to="`/my-trip/edit/${article.id}`"
                class="font-bold relative text-blue-600 hover:text-blue-800 underline-animate"
                >編輯文章</router-link
              >
            </div>
          </template>
        </TripCard>
      </div>

      <!-- 列表排版 -->
      <div class="">
        <TripList :displayType="displayType" :filteredArticles="filteredMyArticles">
          <template #default="{ article }">
            <!-- 查看更多 -->
            <div class="flex gap-2 justify-end">
              <button
                @click="deleteArticleHandler(article.id)"
                class="font-bold relative text-danger hover:text-red-800 underline-animate"
              >
                刪除文章
              </button>
              <router-link
                :to="`/my-trip/edit/${article.id}`"
                class="font-bold relative text-blue-600 hover:text-blue-800 underline-animate"
                >編輯文章</router-link
              >
            </div>
          </template>
        </TripList>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useTripInfoStore } from '@/stores/tripInfo'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import TripCard from '../components/TripCard.vue'
import TripList from '../components/TripList.vue'
import PopupModal from '@/components/PopupModal.vue'

const tripStore = useTripInfoStore()
const userStore = useUserStore()
const { keyword, filteredArticles, tag } = storeToRefs(tripStore)
const { user } = storeToRefs(userStore)
const displayType = ref('card')
const showModal = ref(false)
const selectedCategory = ref([...tag.value])

const categoryTags = ['自然', '歷史', '美食']

const toggleCategory = (tag) => {
  const i = selectedCategory.value.indexOf(tag)
  i > -1 ? selectedCategory.value.splice(i, 1) : selectedCategory.value.push(tag)
}

const applyFilters = () => {
  tag.value = [...selectedCategory.value]
  showModal.value = false
}

// 只篩選出登入者的文章
const filteredMyArticles = computed(() => {
  return filteredArticles.value
    .filter((article) => article.authorID === user.value.id)
    .filter((article) => {
      return keyword.value
        ? article.title.toLowerCase().includes(keyword.value.toLowerCase())
        : true
    })
})

const displayListHandler = () => {
  displayType.value = 'list'
}

const displayCardHandler = () => {
  displayType.value = 'card'
}

function deleteArticleHandler(id) {
  if (confirm('確定要刪除這篇文章嗎？')) {
    tripStore.deleteArticle(id)
  }
}

onMounted(async () => {
  await tripStore.loadArticles()
})
</script>
