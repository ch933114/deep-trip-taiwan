<template>
  <header>
    <div class="flex justify-end">
      <nav
        class="hidden lg:flex lg:justify-between lg:items-center lg:w-7/10 lg:px-8 lg:p-3 lg:bg-secondary lg:text-white lg:text-lg lg:rounded-bl-[40px]"
      >
        <ul class="hidden lg:flex mr-20">
          <li><NavLink :to="{ name: 'home' }">首頁</NavLink></li>
          <li><NavLink :to="{ name: 'trip-intro' }">旅程推薦</NavLink></li>
          <li><NavLink :to="{ name: 'visit-us' }">前往總部</NavLink></li>
          <li v-if="isLoggedIn"><NavLink :to="{ name: 'my-trip' }">我的旅程</NavLink></li>
          <li v-if="isLoggedIn"><NavLink :to="{ name: 'member-center' }">會員中心</NavLink></li>
          <li v-if="isLoggedIn">
            <button class="inline-block px-8 py-3" @click="handleLogout">登出</button>
          </li>
          <li v-else><NavLink :to="{ name: 'login' }">登入</NavLink></li>
        </ul>
      </nav>
    </div>
    <!-- 漢堡按鈕 -->
    <div
      @click="displayMenu"
      :class="[
        'fixed top-4 right-6 w-10 h-10 cursor-pointer z-30 flex flex-col justify-center items-center space-y-1 bg-secondary rounded-[5px]',
        menuVisibility ? 'clicked' : '',
      ]"
      aria-label="Toggle menu"
    >
      <span class="block w-8 h-[2px] bg-white transition-all duration-300 bar-top"></span>
      <span class="block w-8 h-[2px] bg-white transition-all duration-300 bar-mid"></span>
      <span class="block w-8 h-[2px] bg-white transition-all duration-300 bar-bottom"></span>
    </div>

    <!-- 全螢幕選單 -->
    <transition name="fade">
      <div
        v-if="menuVisibility"
        class="fixed top-0 left-0 w-screen h-screen bg-secondary z-20 flex flex-col items-center justify-center text-white text-2xl space-y-6"
      >
        <NavLink :to="{ name: 'home' }" @click="displayMenu">首頁</NavLink>
        <NavLink :to="{ name: 'trip-intro' }" @click="displayMenu">旅程推薦</NavLink>
        <NavLink :to="{ name: 'visit-us' }">前往總部</NavLink>
        <NavLink v-if="isLoggedIn" :to="{ name: 'my-trip' }" @click="displayMenu">我的旅程</NavLink>
        <NavLink v-if="isLoggedIn" :to="{ name: 'member-center' }" @click="displayMenu"
          >會員中心</NavLink
        >
        <button
          v-if="isLoggedIn"
          @click="handleLogout"
          class="mt-4 text-white border px-6 py-2 rounded"
        >
          登出
        </button>
        <NavLink v-else :to="{ name: 'login' }" @click="displayMenu">登入</NavLink>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import NavLink from './NavLink.vue'

const userStore = useUserStore()
const router = useRouter()

const menuVisibility = ref(false)
const displayMenu = () => {
  menuVisibility.value = !menuVisibility.value
}

const isLoggedIn = computed(() => userStore.isLoggedIn)
function handleLogout() {
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.bar-top.clicked {
  transform: translateY(6px) rotate(45deg);
}

.bar-mid.clicked {
  opacity: 0;
}

.bar-bottom.clicked {
  transform: translateY(-6px) rotate(-45deg);
}

/* 也可以改成用 class "clicked" 包住父層，如下 */

.clicked .bar-top {
  transform: translateY(6px) rotate(45deg);
}

.clicked .bar-mid {
  opacity: 0;
}

.clicked .bar-bottom {
  transform: translateY(-6px) rotate(-45deg);
}
</style>
