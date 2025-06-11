import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTripInfoStore = defineStore('tripInfo', () => {
  const articles = ref([])
  const keyword = ref('')
  const isLoading = ref(false)
  const error = ref(null)
  const tag = ref([])

  // 篩選文章方法
  const filteredArticles = computed(() => {
    let result = articles.value

    // 關鍵字篩選
    if (keyword.value.trim()) {
      result = result.filter((article) =>
        article.title.toLowerCase().includes(keyword.value.toLowerCase()),
      )
    }

    // Tag 篩選
    if (tag.value.length > 0) {
      result = result.filter((article) => {
        // 判斷每個選擇的 tag 都要在 article.tags 中 (不分大小寫)
        const match = tag.value.every((t) =>
          article.tags.some((at) => at.toLowerCase() === t.toLowerCase()),
        )
        return match
      })
    }
    return result
  })

  // 載入資料方法
  async function loadArticles() {
    isLoading.value = true
    error.value = null
    try {
      const saved = sessionStorage.getItem('articles')
      if (saved) {
        articles.value = JSON.parse(saved)
      } else {
        const res = await fetch('/data/articles.json')
        articles.value = await res.json()
        sessionStorage.setItem('articles', JSON.stringify(articles.value))
      }
    } catch (err) {
      error.value = '資料載入失敗'
    } finally {
      isLoading.value = false
    }
  }

  // 修改文章方法
  function updateArticle(id, updatedFields) {
    const index = articles.value.findIndex((a) => String(a.id) === String(id))
    if (index !== -1) {
      articles.value[index] = {
        ...articles.value[index],
        ...updatedFields,
      }
    }
    sessionStorage.setItem('articles', JSON.stringify(articles.value))
  }

  // 新增文章方法
  function addArticle(newArticle) {
    // 設定新 ID
    newArticle.id = articles.value.length + 1

    // 推進資料
    articles.value.push(newArticle)
    sessionStorage.setItem('articles', JSON.stringify(articles.value))
  }

  //刪除文章方法
  function deleteArticle(id) {
    const index = articles.value.findIndex((a) => String(a.id) === String(id))
    if (index !== -1) {
      articles.value.splice(index, 1)
      sessionStorage.setItem('articles', JSON.stringify(articles.value))
    }
  }

  return {
    articles,
    keyword,
    tag,
    filteredArticles,
    loadArticles,
    updateArticle,
    addArticle,
    deleteArticle,
  }
})
