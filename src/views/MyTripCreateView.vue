<template>
  <div class="p-6 max-w-[1296px] mx-auto">
    <h1 class="text-4xl font-bold mb-4 mt-20">新增旅程</h1>

    <label class="block mb-2 font-bold">標題</label>
    <input v-model="editedArticle.title" type="text" class="border p-2 w-full mb-4" />

    <label class="block mb-2 font-bold">發布時間</label>
    <input
      v-model="editedArticle.publishedAt"
      type="datetime-local"
      class="border p-2 w-full mb-4"
    />

    <label class="block mb-2 font-bold">發布人</label>
    <input v-model="editedArticle.author" type="text" class="border p-2 w-full mb-4" />

    <div class="flex flex-wrap gap-2 mb-4">
      <span
        v-for="(tag, index) in editedArticle.tags"
        :key="tag"
        class="bg-primary-light text-sm px-2 py-1 rounded-full flex items-center gap-1"
      >
        {{ tag }}
        <button @click="removeTag(index)" class="text-red-500">×</button>
      </span>
      <input v-model="editTag" placeholder="新增標籤..." class="border px-2 py-1 rounded" />
      <button @click="addTag" class="bg-primary text-white px-4 py-2 rounded">新增標籤</button>
    </div>

    <label class="block mb-2 font-bold">旅程摘要</label>
    <textarea v-model="editedArticle.summary" class="border p-2 w-full mb-4" rows="6"></textarea>

    <ul class="flex gap-4 mb-6">
      <li
        v-for="item in editedArticle.itinerary"
        :key="item.day"
        @click="selectDay(item.day)"
        :class="[
          'cursor-pointer p-4 rounded',
          selectedDay === item.day ? 'bg-primary text-white' : 'bg-primary-light',
        ]"
      >
        第 {{ item.day }} 天
      </li>
      <button @click="addItineraryDay" class="bg-green-500 text-white px-4 py-2 rounded">
        ＋ 新增一天旅程
      </button>
      <button @click="removeItineraryDay" class="bg-red-500 text-white px-4 py-2 rounded">
        刪除這一天
      </button>
    </ul>

    <div v-if="selectedDayData">
      <label class="block mb-2 font-bold">單日旅程標題</label>
      <input type="text" v-model="selectedDayData.title" class="border p-2 w-full mb-4" />
      <label class="block mb-2 font-bold">單日行程描述</label>
      <textarea
        v-model="selectedDayData.description"
        class="w-full border rounded p-2"
        rows="6"
      ></textarea>
    </div>

    <div class="text-right">
      <button @click="saveArticle" class="bg-primary text-white px-4 py-2 rounded">儲存</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useTripInfoStore } from '@/stores/tripInfo'
import { useUserStore } from '@/stores/user'

const tripStore = useTripInfoStore()
const userStore = useUserStore()
const router = useRouter()
const editedArticle = ref({
  title: '',
  publishedAt: '',
  author: userStore.user.name,
  authorID: userStore.user.id,
  tags: [],
  summary: '',
  itinerary: [],
})

const editTag = ref('')
const selectedDay = ref(null)

function addTag() {
  const newTag = editTag.value.trim()
  if (newTag && !editedArticle.value.tags.includes(newTag)) {
    editedArticle.value.tags.push(newTag)
  } else {
    alert('請確認輸入標籤是否為空或已重複')
  }
  editTag.value = ''
}

function removeTag(index) {
  editedArticle.value.tags.splice(index, 1)
}

function selectDay(day) {
  selectedDay.value = day
}

const selectedDayData = computed(() => {
  return editedArticle.value.itinerary.find((i) => i.day === selectedDay.value) || null
})

function addItineraryDay() {
  const newDay = editedArticle.value.itinerary.length + 1
  editedArticle.value.itinerary.push({ day: newDay, title: '', description: '' })
  selectedDay.value = newDay
}

function removeItineraryDay() {
  const index = editedArticle.value.itinerary.findIndex((i) => i.day === selectedDay.value)
  if (index !== -1 && confirm(`確定要刪除第 ${selectedDay.value} 天的旅程嗎？`)) {
    editedArticle.value.itinerary.splice(index, 1)
    editedArticle.value.itinerary.forEach((item, idx) => (item.day = idx + 1))
    selectedDay.value = editedArticle.value.itinerary.length
      ? editedArticle.value.itinerary[0].day
      : null
  }
}

function saveArticle() {
  tripStore.addArticle(editedArticle.value)
  alert('新增成功！')
  router.push('/my-trip')
}
</script>
