<template>
  <div
    class="relative flex items-center justify-center bg-[url('/images/banner.png')] bg-cover bg-center h-[100vh] w-full"
  >
    <div class="absolute left-0 top-0 h-[100vh] w-full bg-[black] bg-opacity-70 z-5"></div>
    <div class="relative z-10 bg-white p-10 rounded-[10px] flex flex-col gap-4 text-lg">
      <h2 class="text-center text-3xl font-bold">帳號註冊</h2>
      <div class="flex gap-4 items-center justify-between">
        <label for="email">註冊信箱</label>
        <input
          name="email"
          v-model="email"
          placeholder="請輸入信箱"
          class="p-2 bg-primary-light rounded-[5px]"
        />
      </div>
      <div class="flex gap-4 items-center justify-between">
        <label for="password">密碼</label>
        <input
          v-model="password"
          type="password"
          placeholder="請輸入密碼"
          class="p-2 bg-primary-light rounded-[5px]"
        />
      </div>
      <div class="flex gap-4 items-center justify-between">
        <label for="password">確認密碼</label>
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="請再次輸入密碼"
          class="p-2 bg-primary-light rounded-[5px]"
        />
      </div>
      <p class="text-center text-danger">{{ error }}</p>
      <button class="bg-primary text-white py-2 rounded-[5px] mt-8" @click="handleRegister">
        送出
      </button>
      <p class="text-center">
        已經是深旅行夥伴 ?
        <router-link :to="{ name: 'login' }" class="font-bold underline">前往登入</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const router = useRouter()
const userStore = useUserStore()

const handleRegister = () => {
  error.value = ''

  if (!email.value || !password.value || !confirmPassword.value) {
    error.value = '請填寫所有欄位'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = '密碼與確認密碼不一致'
    return
  }

  const success = userStore.register(email.value, password.value)
  if (success) {
    router.push('/member-center')
  } else {
    error.value = '註冊失敗：信箱已存在或格式錯誤'
  }
}
</script>
