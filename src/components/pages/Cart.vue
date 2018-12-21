<template>
  <div>
    <div class="nav_bar">
      <van-nav-bar title="购物车"></van-nav-bar>
    </div>
    <div class="card_title">
      <van-button size="small" type="danger" plain @click="clearCart">清空购物车</van-button>
    </div>
    <div class="cart_list">
      <div class="sugar_row" v-for="(item,index) in cartInfo" :key="index">
        <div class="sugar_img">
          <img :src="item.image" alt width="100%">
        </div>
        <div class="sugar_text">
          <div class="goods_name">{{item.name}}</div>
          <div class="sugar_contol" style="margin-top:30px;">
            <van-stepper v-model="item.count"></van-stepper>
          </div>
        </div>
        <div class="sugar_price">
          <div>￥{{item.price | moneyFilter}}</div>
          <div>
            <span>X{{item.count}}</span>
          </div>
        </div>
        <div class="allPrice">合计：{{item.price*item.count | moneyFilter}}</div>
      </div>
      <div class="totalMoney">商品总价：￥ {{totalMoney | moneyFilter}}</div>
    </div>
  </div>
</template>

<script>
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  data() {
    return {
      cartInfo: [], //购物车信息
      isEmpty: false //购物车是否为空，不为空则显示true，为空显示false
    };
  },
  created() {
    this.getCartInfo();
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  computed:{
    totalMoney(){
      let allMoney=0
      this.cartInfo.forEach((item,index)=>{
        allMoney+=item.price*item.count
      })
      localStorage.cartInfo=JSON.stringify(this.cartInfo)
      return allMoney
    }
  },
  methods: {
    getCartInfo() {
      // 得到购物车信息的方法
      if (localStorage.cartInfo) {
        //判断是否有购物车信息
        this.cartInfo = JSON.parse(localStorage.cartInfo); // 转为对象 接收购物车信息
      }
      console.log("this.cartInfo" + JSON.stringify(this.cartInfo));
      this.isEmpty = this.cartInfo > 0 ? true : false;
    },
    //清空购物车
    clearCart() {
      localStorage.removeItem("cartInfo");
      this.cartInfo = [];
    }
  }
};
</script>

<style scoped>
.totalMoney {
  text-align: right;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
}
.sugar_row {
  display: flex;
  justify-content: flex-start;
  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #e4e7ed;
}
.allPrice {
  position: relative;
  top: 84px;
  height: 30px;
}
.sugar_price {
  height: 55px;
  position: relative;
  left: 87px;
  width: 100px;
}
.goods_name {
  padding-top: 10px;
}

.sugar_img {
  flex: 6;
}
.sugar_price {
  padding-top: 11px;
  color: red;
}
.sugar_text {
  flex: 14;
  padding-left: 10px;
}

.sugar_control {
  padding-top: 10px;
}

.sugar_price {
  flex: 4;
  text-align: right;
}

.cart_list {
  background-color: #fff;
}

.card_title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
}
</style>
