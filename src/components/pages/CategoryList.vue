<template>
  <div>
    <div>
      <van-nav-bar title='类别列表'></van-nav-bar>
    </div>
    <div>
      <van-row>
        <van-col span='6'>
          <div id="left_nav">
            <ul>
              <li @click="clcikCategory(index,item.ID)" :class="{active:categoryIndex==index}" v-for="(item,index) in category"
                :key="index">
                {{item.MALL_CATEGORY_NAME}}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span='18'>
          <div class='tab_sub'>
            <van-tabs v-model="actives" @click="onclickcategorysub()">
              <van-tab v-for='(item,index) in categorySub' :key='index' :title='item.MALL_SUB_NAME'></van-tab>
            </van-tabs>
          </div>
          <div id='list'>
            <van-pull-refresh v-model='isRefresh' @refresh='onRefresh()'>
              <van-list v-model='loading' :finished='finished' @load="onLoad">
                <div class="list_item" @click="goGoodsInfo(item.ID)" v-for="(item,index) in goodList" :key="index">
                  <div class="list_img">
                    <img 
                    :src="item.IMAGE1" 
                    width="100%" 
                    :onerror='errorImg'
                    /></div>
                  <div class="list_text">
                    <div>{{item.NAME}}</div>
                    <div class="">￥{{item.ORI_PRICE | moneyFilter}}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import url from '@/serviceAPI.config.js'
  import {toMoney} from '@/filter/moneyFilter.js'
  import {oast} from 'vant';
  export default {
    data() {
      return {
        category: [], //大类别表
        categoryIndex: 0, //点击当前
        categorySub: [], // 获取小类类别
        actives: 0, // 激活标签的值
        loading: false, //上拉加载状态
        finished: false, // 上拉加载是否有数据
        page: 1, //商品列表页数
        goodList: [], // 商品列别信息
        categorySubId: '', // 商品子类信息
        isRefresh: false, //下拉刷新
        errorImg:'this.src="'+require('@/assets/images/errorimg.png')+'"',
      }
    },
    filters:{
      moneyFilter(money){
        return toMoney(money)
      }
    },
    created() {
      this.getCategory()
    },
    mounted() {
      let winHeight = document.documentElement.clientHeight
      document.getElementById("left_nav").style.height = winHeight - 46 + 'px'
      document.getElementById("list").style.height = winHeight - 90 -50+ 'px'
    },
    methods: {
      getCategory() { //大类
        axios({
            url: url.getCateGoryList,
            method: 'get',
          })
          .then((result) => {
            if (result.data.code == 200 && result.data.message) {
              this.category = result.data.message
              this.getCategorySubByCategoryID(this.category[0].ID) //解决刷新没有小类信息bug
            } else {
              Toast('服务器异常,请求失败')
            }
          })
          .catch((err) => {
            console.log(err)
          });
      },
      clcikCategory(index, categoryId) { //点击当前
        this.categoryIndex = index
        this.page = 1
        this.finished = false
        this.goodList = []
        this.getCategorySubByCategoryID(categoryId)

      },
      /* 根据大类读取小类列别列表 */
      getCategorySubByCategoryID(categoryId) {
        axios({
            url: url.getCategorySubList,
            method: 'post',
            data: {
              categoryId: categoryId
            } //categoryId 从上面传送的参数获取
          })
          .then((result) => {
            if (result.data.code == 200 && result.data.message) {
              this.categorySub = result.data.message
              console.log(this.categorySub)
              this.actives = 0 //解决选择其他类时候小类不归零
              this.categorySubId = this.categorySub[0].ID
              this.onLoad()
            }
          })
          .catch((err) => {
           
          });
      },
      // 上拉加载
      onLoad() {
        setTimeout(() => {
          //如果有小类ID 就直接赋值，如果没有就从小类获取到第一个小类ID
          this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID
          this.getGoodList()
        }, 1000)
      },
      //下拉刷新
      onRefresh() {
        setTimeout(() => {
          this.isRefresh = false;
          this.goodList = []
          this.finished = false //解决上啦加载完成后下拉刷新不加载数据 bug
          this.page=1
           this.onLoad()
        }, 500)
      },
      //获取商品小类信息
      getGoodList() {
        axios({
            url: url.getGoodsListByCategorySubID,
            method: 'post',
            data: {
              categorySubId: this.categorySubId,
              page: this.page
            }
          })
          .then((result) => {
           
            if (result.data.code == 200 && result.data.message.length) {
              this.page++
              this.goodList = this.goodList.concat(result.data.message) //数组合并

            } else {
              this.finished = true
            }
            this.loading = false;
          })
          .catch((err) => {
            console.log(err)
          });
      },
      // 点击子类的方法
      onclickcategorysub(index, title) {
        
        this.categorySubId = this.categorySub[index].ID
        console.log(this.categorySubId)
       
        // 初始化操作
        this.goodList = []
        this.finished = false
        this.page = 1
        this.onLoad()
      },
      //跳转到商品详细页
      goGoodsInfo(id){
        //如果使用了name   就是用params接收数据    如果使用 path:  就是用query
        this.$router.push({name:'Goods',params:{goodsId:id}})
      }
    },



  }

</script>

<style scoped>
  .list_item {
    display: flex;
    flex-direction: row;
    font-size: 0.8rem;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    padding: 5px;
  }

  .list_img {
    flex: 8;
  }

  .list_text {
    flex: 16;
    margin-top: 10px;
    margin-left: 10px;
  }

  #left_nav {
    background: aliceblue
  }

  ul li {
    line-height: 2rem;
    border-bottom: 1px solid #e4e7ed;
    padding: 3px;
    font-size: 0.8rem;
    text-align: center
  }

  .active {
    background: #ffffff;
  }

  .list_item {
    display: flex;
    flex-direction: row;
    font-size: 0.8rem;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    padding: 5px;
  }

  #list {
    overflow: scroll;
  }

</style>
