<template>
  <!--  hot area-->

  <div class="goods-info" @click="goGoodsPage()">
    <div class="image">
      <img v-lazy="image" width="90%" />
    </div>
    <p class="name">{{name}}</p>
    <p class="price">￥{{price | moneyFilter }}</p>
  </div>
</template>

<script>
  import { toMoney} from '@/filter/moneyFilter.js'
  export default {
    props: ['image', 'name', 'price','goodsId' ],
    filters: { //过滤器
      moneyFilter(money) {
        return toMoney(money)
      }
    },
    methods:{
      goGoodsPage(){
        this.$router.push({name:'Goods',query:{goodsId:this.goodsId}})
      }
    }
  }

</script>

<style scoped>
  /* hot goods*/
  .name {
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

</style>
