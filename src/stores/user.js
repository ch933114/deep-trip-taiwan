import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  // 狀態
  const user = ref(JSON.parse(sessionStorage.getItem('user')) || null)

  // 計算屬性
  const isLoggedIn = computed(() => !!user.value)
  const role = computed(() => user.value?.role || '')

  // 模擬系統建立時間
  const systemCreateTime = ref(new Date('2025-02-01'))

  // 模擬使用者資料
  const fakeUsers = ref([
    { id: 1, name: 'dean', email: 'ch933114@gmail.com', password: '12345678', role: 'admin' },
    { id: 2, name: 'sally', email: 'deanliu010036@gmail.com', password: '12345678', role: 'user' },
    { id: 3, name: 'lisa', email: 'lisa1234@gmail.com', password: '12345678', role: 'user' },
  ])

  // 登入方法
  function login(email, password) {
    const foundUser = fakeUsers.value.find((u) => u.email === email && u.password === password)
    if (foundUser) {
      user.value = foundUser
      sessionStorage.setItem('user', JSON.stringify(foundUser))
      return true
    }
    return false
  }

  // 註冊方法
  function register(email, password) {
    const existingUser = fakeUsers.value.find((u) => u.email === email)
    if (existingUser) return false // 註冊失敗，帳號已存在

    const newUser = {
      email,
      password,
      role: 'user',
    }

    fakeUsers.value.push(newUser)
    user.value = newUser
    sessionStorage.setItem('user', JSON.stringify(newUser))
    return true
  }

  // 登出方法
  function logout() {
    user.value = null
    sessionStorage.removeItem('user')
  }

  //更新使用者資料
  function updateUser({ name, password }) {
    if (!user.value) return

    const index = fakeUsers.value.findIndex((u) => u.email === user.value.email)
    if (index === -1) return

    if (name) {
      user.value.name = name
      fakeUsers.value[index].name = name
    }
    if (password) {
      user.value.password = password
      fakeUsers.value[index].password = password
    }

    // 更新 sessionStorage
    sessionStorage.setItem('user', JSON.stringify(user.value))
  }

  // 初始化：若 sessionStorage 有資料，自動還原
  const init = () => {
    const stored = sessionStorage.getItem('user')
    if (stored) {
      user.value = JSON.parse(stored)
    }
  }

  // 立即執行初始化
  init()

  return {
    user,
    isLoggedIn,
    role,
    login,
    logout,
    register,
    fakeUsers,
    systemCreateTime,
    updateUser,
  }
})
