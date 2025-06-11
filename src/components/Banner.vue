<template>
  <div class="relative bg-[url('/images/banner.png')] bg-cover bg-center h-[100vh] w-full">
    <div class="absolute left-0 top-0 h-[100vh] w-full bg-[black] bg-opacity-70 z-5"></div>
    <div class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10">
      <img src="/images/logo.png" alt="社群logo" class="max-w-[120px] lg:max-w-[200px]" />
    </div>
    <div class="hidden text-white absolute left-10 bottom-10 sm:flex sm:flex-col">
      <div class="text-2xl flex justify-between mb-1">
        <span>{{ year }}</span> / <span>{{ month }}</span> / <span>{{ day }}</span>
      </div>
      <div class="flex justify-between">
        <img v-if="weatherData === '晴'" src="/images/sun.png" alt="晴" class="mr-2 w-[80px]" />
        <img
          v-if="weatherData === '多雲'"
          src="/images/cloudy.png"
          alt="多雲"
          class="mr-2 w-[80px]"
        />
        <img v-if="weatherData === '陰'" src="/images/rainy.png" alt="陰" class="mr-2 w-[80px]" />
        <div
          v-if="weatherData === '-99'"
          class="px-4 mr-2 flex justify-center items-center text-4xl"
        >
          --
        </div>
        <div class="flex flex-col justify-between text-lg">
          <div v-if="tempData" class="text-2xl">{{ tempData }}°C</div>
          <div v-else class="text-2xl">未知 °C</div>
          <div class="flex justify-between"><span>新北</span><span>九份</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const now = new Date()
const year = now.getFullYear()
const month = now.getMonth() + 1
const day = now.getDate()

const weatherData = ref(null)
const tempData = ref(0)
const error = ref(null)

// 介接中央氣象署 API資料
const apiUrl =
  'https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWA-7D6FB27B-E7F9-4390-8005-D18A23B3389F'

onMounted(async () => {
  try {
    const response = await axios.get(apiUrl)
    const rawData = response.data.records.Station

    // 篩選縣市鄉鎮天氣，以基隆市仁愛區為例
    const targetData = rawData.filter((item) => {
      return item.GeoInfo.CountyName === '新北市' && item.GeoInfo.TownName === '瑞芳區'
    })

    if (targetData.length > 0) {
      weatherData.value = targetData[0].WeatherElement.Weather
      tempData.value = targetData[0].WeatherElement.AirTemperature
    } else {
      weatherData.value = '查無資料'
    }
  } catch (err) {
    error.value = err
    console.error('載入氣象資料失敗:', err)
  }
})
</script>
