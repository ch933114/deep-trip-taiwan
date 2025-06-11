<template>
  <ul v-if="displayType === 'list'" class="flex flex-col">
    <li v-for="article in filteredArticles" :key="article.id" class="mb-10">
      <div class="flex flex-col px-2">
        <div class="flex flex-col gap-4">
          <h3 class="font-bold text-3xl">{{ article.title }}</h3>
          <!-- 作者與大頭貼 -->
          <div class="flex gap-2">
            <img src="/images/user_icon.png" alt="使用者大頭貼" class="w-[30px]" />
            <span>{{ article.author }}</span>
            <time>{{ article.publishedAt.slice(0, 10) }}</time>
          </div>
          <!-- 文章標籤 -->
          <div class="flex gap-2">
            <router-link
              v-for="tag in article.tags"
              :key="tag"
              :to="{ path: '/my-trip', query: { tag } }"
              class="bg-primary-light text-xs text-grey p-1 rounded-[2px] cursor-pointer"
            >
              {{ tag }}
            </router-link>
          </div>
          <div>
            <p>{{ article.summary }}</p>
          </div>
          <!-- 查看更多 -->
          <slot :article="article" />
          <hr class="bg-primary h-[1px] border-0" />
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup>
defineProps(['displayType', 'filteredArticles'])
</script>
