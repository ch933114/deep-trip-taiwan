<template>
  <div
    class="relative flex items-center justify-center bg-[url('/images/banner.png')] bg-cover bg-center h-[100vh] w-full"
  >
    <div class="absolute left-0 top-0 h-[100vh] w-full bg-[black] bg-opacity-70 z-5"></div>
    <div class="relative z-10 bg-white p-10 rounded-[10px] flex flex-col gap-4 text-lg">
      <h2 class="text-center text-3xl font-bold">會員基本資料</h2>
      <div class="flex gap-4 items-center justify-between">
        <label for="username">使用者名稱</label>
        <input id="username" v-model="username" class="p-2 bg-primary-light rounded-[5px]" />
      </div>
      <div class="flex gap-4 items-center justify-between">
        <label for="email">註冊信箱</label>
        <input
          id="email"
          :placeholder="loginEmail"
          class="p-2 bg-primary-light rounded-[5px]"
          disabled
        />
      </div>
      <div class="flex gap-4 items-center">
        <label for="password">密碼</label>
        <button
          type="button"
          class="bg-primary text-white p-2 rounded-[5px] text-sm"
          @click="showPasswordInput = !showPasswordInput"
        >
          {{ showPasswordInput ? '取消修改' : '修改密碼' }}
        </button>
      </div>

      <!-- 新密碼欄位 -->
      <div v-if="showPasswordInput" class="flex gap-4 items-center justify-between">
        <label for="newPassword">新密碼</label>
        <input
          id="newPassword"
          type="password"
          v-model="newPassword"
          class="p-2 bg-primary-light rounded-[5px] flex-1"
        />
      </div>

      <!-- 按鈕 -->
      <div class="flex pt-4 gap-4 justify-center">
        <button
          type="button"
          @click="updateProfile"
          class="font-bold relative text-danger hover:text-red-800 underline-animate"
        >
          確認修改
        </button>
        <router-link
          type="button"
          class="font-bold relative text-blue-600 hover:text-blue-800 underline-animate"
          to="/"
        >
          返回首頁
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const loginEmail = computed(() => userStore.user.email)
const loginUser = computed(() => userStore.user.name)

const username = ref(loginUser.value)
const newPassword = ref('')
const showPasswordInput = ref(false) // 控制是否顯示修改密碼欄位

function updateProfile() {
  userStore.updateUser({ name: username.value, password: newPassword.value })
  alert('資料已更新')
  newPassword.value = ''
  showPasswordInput.value = false
}
</script>
