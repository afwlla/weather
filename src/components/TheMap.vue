<template>
  <div id="mapContainer">
    <div id="map"></div>
  </div>
</template>

<style lang="scss" scoped>
@import '~/scss/main.scss';

#mapContainer {
  @include center;
  width: 100%;
  height: 35%;

  #map {
    width: 80%;
    height: 90%;
    border-radius: 10px;
  }
}
</style>
