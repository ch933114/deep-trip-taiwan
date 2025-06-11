<template>
  <div
    class="relative flex items-center justify-center bg-[url('/images/banner.png')] bg-cover bg-center h-[100vh] w-full"
  >
    <div class="absolute left-0 top-0 h-[100vh] w-full bg-[black] bg-opacity-70 z-5"></div>
    <div class="relative z-10 bg-white p-10 rounded-[10px] flex flex-col gap-4 text-lg">
      <h2 class="text-center text-3xl font-bold">會員登入</h2>
      <div class="flex gap-4 items-center justify-between">
        <label for="email">註冊信箱</label>
        <input
          name="email"
          v-model="email"
          placeholder="請輸入註冊信箱"
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
      <p v-if="error" class="text-danger">{{ error }}</p>
      <div class="flex gap-2 text-md">
        <router-link class="font-bold underline">忘記密碼 ? </router-link>
      </div>
      <button class="bg-primary text-white py-2 rounded-[5px] mt-8" @click="handleLogin">
        登入
      </button>
      <p class="text-center">
        還不是深旅行夥伴 ?
        <router-link :to="{ name: 'register' }" class="font-bold underline">立即註冊</router-link>
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
const error = ref('')
const router = useRouter()
const userStore = useUserStore()

const handleLogin = () => {
  const success = userStore.login(email.value, password.value)
  if (success) {
    router.push('/member-center')
  } else {
    error.value = '登入失敗：帳號或密碼錯誤'
  }
}
</script>
