<template>
  <ul
    v-if="displayType === 'card'"
    class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 mb-10"
  >
    <li v-for="article in filteredArticles" :key="article.id" class="mb-10 max-w-[400px] mx-auto">
      <div class="flex flex-col justify-between h-full">
        <div class="flex flex-col gap-3">
          <img src="/images/trip_japan.jpg" alt="" class="max-w-full rounded-[10px] h-[200px]" />
          <h3 class="font-bold">{{ article.title }}</h3>
          <!-- 作者與大頭貼 -->
          <div class="flex items-center gap-2">
            <img src="/images/user_icon.png" alt="使用者大頭貼" class="w-[30px]" />
            <span>{{ article.author }}</span>
            <time>{{ article.publishedAt.slice(0, 10) }}</time>
          </div>
          <!-- 文章標籤 -->
          <div class="flex gap-2">
            <span
              v-for="tag in article.tags"
              :key="tag"
              class="bg-primary-light text-xs text-grey p-1 rounded-[2px]"
            >
              {{ tag }}
            </span>
          </div>
          <!-- 文章摘要 -->
          <p class="line-clamp-2">{{ article.summary }}</p>
        </div>
        <div class="pt-5 flex justify-end">
          <slot :article="article" />
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup>
defineProps(['displayType', 'filteredArticles'])
</script>
