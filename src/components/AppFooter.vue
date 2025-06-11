<template>
  <footer class="px-4 py-10 bg-primary text-white">
    <div class="flex flex-col lg:flex-row p-6 md:p-12 gap-8 justify-between">
      <div class="flex flex-col items-center gap-8 lg:flex-row">
        <img src="/images/footer_logo.png" alt="表尾logo" class="w-[200px] h-[200px]" />
        <ul
          class="flex flex-col h-full mb-8 justify-between gap-4 text-2xl text-center lg:mb-0 lg:text-left"
        >
          <li><NavLink :to="{ name: 'home' }">首頁</NavLink></li>
          <li><NavLink :to="{ name: 'trip-intro' }">旅程推薦</NavLink></li>
          <li><NavLink :to="{ name: 'visit-us' }">前往總部</NavLink></li>
          <li><NavLink :to="{ name: 'home' }">聯絡我們</NavLink></li>
        </ul>
      </div>
      <div class="text-center text-lg lg:text-right flex flex-col gap-4">
        <p>聯絡電話 : 037-322567</p>
        <p>聯絡地址 : 苗栗縣苗栗市府前路1號</p>
        <p>聯絡信箱 : ch933114@gmail.com</p>
        <ul class="flex justify-center mb-8 lg:justify-end gap-2">
          <li>
            <a href=""><img src="/images/line_icon.png" alt="line連結" /></a>
          </li>
          <li>
            <a href=""><img src="/images/linkedin_icon.png" alt="linkedin連結" /></a>
          </li>
          <li>
            <a href=""><img src="/images/fb_icon.png" alt="FB連結" /></a>
          </li>
          <li>
            <a href=""><img src="/images/ig_icon.png" alt="IG連結" /></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="text-center text-secondary-light text-lg flex flex-col gap-3">
      <p>本網站僅供個人作品使用，未提供商業用途</p>
      <p>TaiwanDT © 2025 COPYRIGHT</p>
    </div>
  </footer>
</template>

<script setup>
import NavLink from './NavLink.vue'
</script>
