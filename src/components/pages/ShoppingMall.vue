<template>
  <div>
    <!--搜索栏 -->
    <div class="search_bar">
      <van-row>
        <van-col span="3">
          <!--vant是二十四格-->
          <img :src="locationIcon" width="80%" class="location_icon">
        </van-col>
        <van-col span="16">
          <input type="text" class="search_input">
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- swiper area -->
    <div class="swiper_area">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(banner, index) in slides" :key="index">
          <img v-lazy="banner.image" width="100%">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- type bar -->
    <div class="type_bar">
      <div v-for="(item,index) in category" :key="index">
        <img v-lazy="item.image" width="90%">
        <span>{{item.mallCategoryName}}</span>
      </div>
    </div>
    <!-- advertes Picture -->
    <div class="advertes_picture">
      <img v-lazy="advertesPicture.PICTURE_ADDRESS" width="100%">
    </div>
    <!-- recommend goods area -->
    <div class="recommend_area">
      <p class="recommend_title">商品推荐</p>
      <div class="recommend_content">
        <swiper :options="swiperOption">
          <swiper-slide v-for=" (item ,index) in recommend_goods" :key="index">
            <div class="recommend_item">
              <img :src="item.image" width="80%">
              <div>{{item.goodsName}}</div>
              <div class="price">
                <span>${{item.price| moneyFilter}}</span>
                <span>(${{item.mallPrice| moneyFilter}})</span>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <floorComponent :floorData='floor1' :floorTitle="floorName.floor1"></floorComponent>
    <floorComponent :floorData='floor2' :floorTitle="floorName.floor2"></floorComponent>
    <floorComponent :floorData='floor3' :floorTitle="floorName.floor3"></floorComponent>
    <!-- hot goods -->
    <div class="hot_area">
      <p class="hot_title">热卖商品</p>
      <div class="hot_goods">
        <van-row gutter="20" style='margin:0'>
          <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
            <hot-goods :goodsId='item.goodsId' :image="item.image" :name="item.name" :price="item.price"></hot-goods>
          </van-col>
        </van-row>
      </div>
    </div>


  </div>
</template>

<script>
  import axios from 'axios'
  import 'swiper/dist/css/swiper.css'
  import { swiper,swiperSlide} from 'vue-awesome-swiper'
  import floorComponent from '../component/floorComponent'
  import {toMoney} from '@/filter/moneyFilter.js'
  import hotGoods from '../component/hotGoods'
  import url from '@/serviceAPI.config.js'
  export default {
    data() {
      return {
        swiperOption: {
          slidesPerView: 3
        },
        locationIcon: require('../../assets/images/location.png'),
        slides: [], //轮播图
        category: [], // 我们在下面钩子函数中所有使用的函数对象都得在这里注册一下才能生效的，否则会报错的
        advertesPicture: '', //广告
        recommend_goods: [], //推荐商品
        floor1: [], //楼层
        floor2: [], //楼层
        floor3: [], //楼层
        floorName: {}, //楼层title
        hotGoods: [], //热卖商品
      }
    },
    filters: { /* 写的方法需要在这里先调用 */
      moneyFilter(money) {
        return toMoney(money)
      }
    },
    components: {
      swiper,
      swiperSlide,
      floorComponent,
      hotGoods
    }, //引用组件
    created() {
      axios({
          url: url.getShoppingMaillInfo,
          method: 'get'
        })
        .then(Response => { /*我们的方法都写在这里*/
          if (Response.status == 200) {
            this.category = Response.data.data.category
            this.advertesPicture = Response.data.data.advertesPicture //广告宣传
            this.slides = Response.data.data.slides //轮播图
            this.recommend_goods = Response.data.data.recommend //商品推荐
            this.floor1 = Response.data.data.floor1 //楼层
            this.floor2 = Response.data.data.floor2 //楼层
            this.floor3 = Response.data.data.floor3 //楼层
            this.floorName = Response.data.data.floorName //楼层title
            this.hotGoods = Response.data.data.hotGoods //热卖商品
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

</script>

<style scoped>
  /* hot goods */
  .hot_area {
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem
  }
.hot_goods{
  height: 130rem;
  overflow: hidden;
  background: #fff;
}
  /*recommend_area*/
  .recommend_area {
    background: #fff;
    margin-top: .3rem;
  }

  .recommend_title {
    border-bottom: 1px solid #eee;
    text-align: center;
    font-size: 15px;
    color: #e5017d;
    padding: .3rem
  }

  .recommend_content {
    border-bottom: 1px solid #eee;
  }

  .recommend_item {
    width: 99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
  }

  /* type_bar*/
  .type_bar {
    background: #fff;
    margin: 0.3rem .3rem .3rem;
    border-radius: .3rem;
    font-size: 14px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    touch-action: none;
  }

  .type_bar>div {
    padding: .3rem;
    font-size: 12px;
    text-align: center;
    flex: 1
  }

 
  /*swiper_area*/
  .swiper_area {
    width: 100%;
    height: 9rem;
    clear: both;
    overflow: hidden;
  }

  .swiper_area>div {
    height: 100%;
  }

  /*search_bar*/
  .search_bar {
    height: 2.2rem;
    background-color: #e5017d;
    line-height: 2.2rem;
    overflow: hidden;
  }

  .search_input {
    width: 100%;
    height: 1.3rem;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px solid #fff !important;
    background-color: #e5017d;
    color: #fff;
  }

</style>
