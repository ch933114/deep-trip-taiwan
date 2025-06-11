<template>
  <ul
    class="flex flex-col items-center justify-center px-4 py-8 mb-20 gap-10 max-w-[1296px] mx-auto text-right"
    data-aos="zoom-in"
  >
    <li class="w-full relative h-[400px]">
      <img
        src="/images/link_img1.png"
        alt=""
        class="absolute max-h-full h-full w-full object-cover z-0"
      />
      <div class="absolute bg-black z-10 w-full max-h-full h-full opacity-60"></div>
      <div class="relative z-10 w-full h-full px-10 py-40 flex items-center justify-end">
        <router-link to="/register"
          ><span
            class="text-3xl md:text-[50px] text-white font-bold font-Han hover:text-black transition-all duration-300"
            >加入臺灣深旅行</span
          ></router-link
        >
      </div>
    </li>
    <li class="w-full relative h-[400px]">
      <img
        src="/images/link_img2.png"
        alt=""
        class="absolute max-h-full h-full w-full object-cover z-0"
      />
      <div class="absolute bg-accent1 z-10 w-full max-h-full h-full opacity-60"></div>
      <div class="relative z-10 w-full h-full px-10 py-40 flex items-center justify-end">
        <router-link to="/visit-us"
          ><span
            class="text-3xl md:text-[50px] text-black font-bold font-Han hover:text-white transition-all duration-300"
            >前往深旅行總部</span
          ></router-link
        >
      </div>
    </li>
  </ul>
</template>

<script setup></script>
