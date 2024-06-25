<template>
  <div class="leftContainer">
    <div id="cityNameBox">
      <div class="cityName">
        <!-- <p>{{ cityName }}</p>
              <p>{{ currentTime }}</p> -->
      </div>
    </div>
    <div id="contentsBox">
      <div class="buttonBox">
        <div class="buttonBackground">
          <button class="forecast">Forecast</button>
          <button class="airquality">Air Quality</button>
        </div>
      </div>
      <div class="weatherBox">
        <!-- <div class="weatherDegree">
                  <p>{{ currentTemp }}&deg;</p>
              </div>
              <div class="weatherIcon">
                  <img :src="images[0]" alt="MainLogo" />
              </div>
              <div class="weatherData">
                  <div v-for="temporary in temporaryData" :key="temporary.title" class="detailData">
                      <p>{{ temporary.title }}</p>
                      <p>{{ temporary.value }}</p>
                  </div>
              </div> -->
      </div>
    </div>
    <div id="todayWeather">
      <div class="textBox">
        <p>시간대별 날씨 정보</p>
        <p>이번주 날씨 보기</p>
      </div>
      <div class="timelyWeatherBox">
        <!-- <div class="timelyWeather" v-for="(temp, index) in arrayTemps" :key="index">
                  <div class="icon">
                      <img :src="images[index]" alt="" />
                  </div>
                  <div class="data">
                      <p class="time">
                          {{ Unix_timestamp(temp.dt) }}
                      </p>
                      <p class="currentDegree">{{ Math.round(temp.temp) }}&deg;</p>
                      <div>
                          <img src="~/assets/images/drop.png" alt="" />
                          <p class="fall">{{ temp.humidity }}%</p>
                      </div>
                  </div>
              </div> -->
      </div>
    </div>
    <nav>
      <i class="fas fa-home"></i>
      <i class="fas fa-search-location"></i>
      <i class="fas fa-chart-line"></i>
      <i class="fas fa-cog"></i>
    </nav>
  </div>
</template>

<script setup>
import axios from 'axios'
//https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
//"latlng": [37.5683, 126.9778]
let initialLat = 37.5683
let initialLon = 126.9778
// const API_KEY = 'd915f0ff80584f2fb62adfc29e388b99'
const API_KEY = '284bfdeb630520653864189833ba7c68'
const a = async () => {
  await axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${initialLat}&lon=${initialLon}&exclude={part}&appid=${API_KEY}`
    )
    .then((res) => {
      console.log(res)
    })
}
a()
</script>

<style lang="scss" scoped>
@import '@/scss/main.scss';
@import '@/scss/mainview.scss';
</style>
