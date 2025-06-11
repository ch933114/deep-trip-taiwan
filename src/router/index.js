import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TripIntroView from '@/views/TripIntroView.vue'
import LoginView from '@/views/Account/LoginView.vue'
import MemberCenterView from '@/views/Account/MemberCenterView.vue'
import RegisterView from '@/views/Account/RegisterView.vue'
import MyTripView from '@/views/MyTripView.vue'
import TripDetailView from '@/views/TripDetailView.vue'
import MyTripEditView from '@/views/MyTripEditView.vue'
import MyTripCreateView from '@/views/MyTripCreateView.vue'
import VisitUsView from '@/views/VisitUs.vue'
import { useUserStore } from '@/stores/user'
import AOS from 'aos'
import 'aos/dist/aos.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/trip-intro/:id',
      name: 'trip-detail',
      component: TripDetailView,
    },
    {
      path: '/trip-intro',
      name: 'trip-intro',
      component: TripIntroView,
    },
    {
      path: '/member-center',
      name: 'member-center',
      component: MemberCenterView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/my-trip',
      name: 'my-trip',
      component: MyTripView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/my-trip/edit/:id',
      name: 'MyTripEdit',
      component: MyTripEditView,
      meta: { requiresAuth: true },
    },
    {
      path: '/my-trip/create',
      name: 'MyTripCreate',
      component: MyTripCreateView,
      meta: { requiresAuth: true },
    },
    {
      path: '/visit-us',
      name: 'visit-us',
      component: VisitUsView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 如果有儲存的位置，回到該位置
    if (savedPosition) {
      return savedPosition
    }
    // 預設回到頁面頂端
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // 判斷是否需要登入
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    return next('/login')
  }

  // 判斷是否需要特定角色
  if (to.meta.role && userStore.role !== to.meta.role) {
    return next('/login') // 或導到權限不足頁面
  }

  next()
})

router.afterEach(() => {
  AOS.refresh()
})

export default router
