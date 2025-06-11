<template>
  <div class="max-w-[1296px] mx-auto p-4 h-full" data-aos="fade-right">
    <div class="relative flex flex-col md:flex-row mb-8 md:h-[600px]">
      <div class="flex flex-col md:flex-row md:w-1/5 justify-center my-4">
        <h2 class="text-3xl md:vertical-text md:text-[50px] font-bold font-Han">單日旅行</h2>
        <span class="md:vertical-text">single day trip</span>
      </div>
      <div class="md:w-4/5 max-h-full">
        <img src="/images/single_day.png" alt="單日行附圖" class="max-h-full w-full object-cover" />
      </div>
      <div
        class="md:absolute md:left-0 md:bottom-[20px] p-8 md:max-w-[600px] bg-white z-10 md:rounded-tr-2xl md:rounded-br-2xl"
      >
        <p class="text-xl mb-8 text-justify">
          在有限的時間裡，來一場深刻的小旅行。無論是登上一座山、拜訪一條老街、或是深入一處小漁村，單日旅行讓你用最輕盈的步伐，體驗台灣最真實的風景。適合每一個想在假日放鬆、重新連結土地的人。
        </p>
        <div class="text-2xl text-right">
          <router-link
            to="/trip-intro"
            class="relative text-blue-600 hover:text-blue-800 underline-animate"
          >
            前往探索
          </router-link>
        </div>
      </div>
    </div>
    <div class="relative flex flex-col md:flex-row-reverse mb-8 md:h-[600px]">
      <div class="flex flex-col md:flex-row md:w-1/5 justify-center my-4">
        <h2 class="text-3xl md:vertical-text md:text-[50px] font-bold font-Han">短天數旅行</h2>
        <span class="md:vertical-text">single day trip</span>
      </div>
      <div class="md:w-4/5 max-h-full">
        <img src="/images/mid_term.png" alt="短天數行附圖" class="max-h-full w-full object-cover" />
      </div>
      <div
        class="md:absolute md:right-0 md:bottom-[20px] p-8 md:max-w-[600px] bg-white z-10 md:rounded-tl-2xl md:rounded-bl-2xl"
      >
        <p class="text-xl mb-8 text-justify">
          週末小出走，讓旅行不只是短暫的逃離，更是與台灣對話的機會。兩到三天的旅程，足以深入一座城市、串連兩個鄉鎮，發現那些在地人才知道的風景與滋味。這是最適合探索者的節奏，不趕路，只走進生活。
        </p>
        <div class="text-2xl text-right">
          <router-link
            to="/trip-intro"
            class="relative text-blue-600 hover:text-blue-800 underline-animate"
          >
            前往探索
          </router-link>
        </div>
      </div>
    </div>
    <div class="relative flex flex-col md:flex-row mb-8 md:h-[600px]">
      <div class="flex flex-col md:flex-row md:w-1/5 justify-center my-4">
        <h2 class="text-3xl md:vertical-text md:text-[50px] font-bold font-Han">長天數旅行</h2>
        <span class="md:vertical-text">single day trip</span>
      </div>
      <div class="md:w-4/5 max-h-full">
        <img
          src="/images/long_term.png"
          alt="長天數行附圖"
          class="max-h-full w-full object-cover"
        />
      </div>
      <div
        class="md:absolute md:left-0 md:bottom-[20px] p-8 md:max-w-[600px] bg-white z-10 md:rounded-tr-2xl md:rounded-br-2xl"
      >
        <p class="text-xl mb-8 text-justify">
          當你願意花一週的時間慢慢走，就能感受到旅行的厚度與溫度。六到七天的深度旅行，適合進入山林步道、走訪多元族群部落，或規劃一條環島之路。這不只是旅程，而是一段轉變，讓你重新認識台灣，也認識自己。
        </p>
        <div class="text-2xl text-right">
          <router-link
            to="/trip-intro"
            class="relative text-blue-600 hover:text-blue-800 underline-animate"
          >
            前往探索
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
