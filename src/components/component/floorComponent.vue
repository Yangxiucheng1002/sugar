<template>

  <!-- floor one area -->
  <div class="floor">
     <div class="floor_title">{{floorTitle}}</div>
    <div class="floor_anomaly">
      <div class="floor_one">
        <img :src="floorData0.image" width="100%">
      </div>
      <div>
        <div class="floor_two">
          <img :src="floorData1.image" width="100%">
        </div>
        <div>
          <img :src="floorData2.image" width="100%">
        </div>
      </div>
    </div>
    <div class="floor_ruler">
      <div v-for="(item,index) in floorData.slice(3)" :key="index">
        <img :src="item.image" width="100%">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    //父子组建传参   floorData就是我们的楼层信息
    props: ['floorData', 'floorTitle'],
    data() {
      return {
        floorData0: {},
        floorData1: {},
        floorData2: {},
      }
    },
    watch: {
      floorData: function (val) {
        this.floorData0 = this.floorData[0]
        this.floorData1 = this.floorData[1]
        this.floorData2 = this.floorData[2]
      }
    }
  }

</script>

<style scoped>
  /*floor_title*/
  .floor_title {
      text-align: center;
      font-size: 15px;
      color: #e5017d;
      height: 1.8rem;
      line-height: 1.8rem;
  }

  /*floor ruler*/
  .floor_ruler {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: wrap;
    background: #fff;
  }

  .floor_ruler>div {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 10rem;
    border-bottom: 1px solid #ddd;
  }

  .floor_ruler div:nth-child(odd) {
    border-right: 1px solid #ddd;
  }

  /*floor area*/
  .floor_anomaly {
    display: flex;
    flex-direction: row;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
  }

  .floor_anomaly div {
    width: 10rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  .floor_one {
    border-right: 1px solid #ddd;
  }

  .floor_two {
    border-bottom: 1px solid #ddd;
  }

</style>
