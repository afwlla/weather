<template>
  <div class="leftContainer">
    <div id="cityNameBox">
      <div class="cityName">
        <p>{{ cityName }}</p>
        <p>{{ currentTime }}</p>
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
        <div class="weatherDegree">
          <p>{{ Math.round(currentTemp) }}&deg;</p>
        </div>
        <div class="weatherIcon">
          <img :src="images[0]" alt="MainLogo" />
        </div>
        <div class="weatherData">
          <div v-for="temporary in temporaryData" :key="temporary.title" class="detailData">
            <p>{{ temporary.title }}</p>
            <p>{{ temporary.value }}</p>
          </div>
        </div>
      </div>
    </div>
    <div id="todayWeather">
      <div class="textBox">
        <p>시간대별 날씨 정보</p>
        <p>이번주 날씨 보기</p>
      </div>
      <div class="timelyWeatherBox">
        <div class="timelyWeather" v-for="(temp, index) in arrayTemps" :key="index">
          <div class="icon">
            <img :src="images[index]" alt="" />
          </div>
          <div class="data">
            <p class="time">
              {{ Unix_timestamp(temp.dt) }}
            </p>
            <p class="currentDegree">{{ Math.round(temp.temp) }}&deg;</p>
            <div>
              <img src="@/assets/images/drop.png" alt="" />
              <p class="fall">{{ temp.humidity }}%</p>
            </div>
          </div>
        </div>
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

<script>
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
dayjs.locale('ko') // global로 한국어 locale 사용

export default {
  data() {
    return {
      // 현재 시간을 나타내기 위한 Dayjs 플러그인 사용
      currentTime: dayjs().format('YYYY. MM. DD. ddd')
    }
  },
  async created() {
    // 초기데이터 선언을 위한 코드 작성
    // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
    // Vuex Store의 Mutations를 실행할 때는 commit() 메서드를
    // Vuex Store의 Actions를 실행할 때는 dispatch() 메서드를 사용한다.
    await this.$store.dispatch('openWeatherApi/FETCH_OPENWEATHER_API')
    const { currentTemp, currentHumidity, currentWindSpeed, currentFeelsLike } =
      this.$store.state.openWeatherApi.currentWeather

    this.currentTemp = currentTemp // 현재시간에 대한 현재온도
    this.temporaryData[0].value = currentHumidity + '%' // 현재시간에 대한 습도
    this.temporaryData[1].value = currentWindSpeed + 'm/s' // 현재시간에 대한 풍속
    this.temporaryData[2].value = Math.round(currentFeelsLike) + '도' // 현재시간에 대한 체감온도
    this.arrayTemps = this.$store.state.openWeatherApi.hourlyWeather
    this.images = this.$store.state.openWeatherApi.imagePath
  },
  computed: {
    // 마커를 선택했을 때, 레이아웃에 보여지는 도시 이름
    cityName() {
      return this.$store.state.openWeatherApi.cityName
    },
    // 현재 시간에 따른 현재 온도 데이터
    currentTemp() {
      const { currentTemp } = this.$store.state.openWeatherApi.currentWeather
      return currentTemp
    },
    arrayTemps() {
      return this.$store.state.openWeatherApi.hourlyWeather
    },
    // 상세 날씨 데이터를 받아주는 데이터 할당
    temporaryData() {
      const { currentHumidity, currentWindSpeed, currentFeelsLike } =
        this.$store.state.openWeatherApi.currentWeather
      return [
        {
          title: '습도',
          value: currentHumidity + '%'
        },
        {
          title: '풍속',
          value: currentWindSpeed + 'm/s'
        },
        {
          title: '체감온도',
          value: Math.round(currentFeelsLike) + '도'
        }
      ]
    },
    // 시간별 날씨 데이터에 대한 아이콘 이미지
    images() {
      return this.$store.state.openWeatherApi.images
    }
  },
  methods: {
    // 타임스탬프로 변환
    Unix_timestamp(dt) {
      let date = new Date(dt * 1000)
      let hour = date.getHours().toString().padStart(2, '0')
      return hour + '시'
    }
  }
}
</script>

<script setup>
// import axios from 'axios'
// import dayjs from 'dayjs'
// import 'dayjs/locale/ko'
// import { ref } from 'vue'
// dayjs.locale('ko')

// const currentTime = dayjs().format('YYYY. MM. DD. ddd')
// const currentTemp = ref('')
// const cityName = ref('')
// const temporaryData = ref([
//   { title: '습도', value: '' },
//   { title: '풍속', value: '' },
//   { title: '체감온도', value: '' }
// ])
// const arrayTemps = ref([''])

// const Unix_timestamp = (dt) => {
//   let date = new Date(dt * 1000)
//   let hour = date.getHours().toString().padStart(2, '0')
//   return hour + '시'
// }
// //https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// //"latlng": [37.5683, 126.9778]
// let initialLat = 37.5683
// let initialLon = 126.9778
// // const API_KEY = 'd915f0ff80584f2fb62adfc29e388b99'
// const API_KEY = '284bfdeb630520653864189833ba7c68'
// const a = async () => {
//   await axios
//     .get(
//       `https://api.openweathermap.org/data/2.5/onecall?lat=${initialLat}&lon=${initialLon}&exclude={part}&appid=${API_KEY}&units=metric`
//     )
//     .then((res) => {
//       console.log(res)
//       cityName.value = res.data.timezone
//       currentTemp.value = res.data.current.temp
//       temporaryData.value[0].value = res.data.current.humidity + '%'
//       temporaryData.value[1].value = res.data.current.wind_speed + 'm/s'
//       temporaryData.value[2].value = res.data.current.feels_like + '도'
//       for (let i = 0; i < 24; i++) {
//         arrayTemps.value[i] = res.data.hourly
//       }
//       console.log(arrayTemps)
//     })
// }
// a()
</script>

<style lang="scss" scoped>
@import '@/scss/main.scss';
@import '@/scss/mainview.scss';
</style>
