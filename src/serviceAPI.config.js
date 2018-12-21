const BASEURL = 'https://www.easy-mock.com/mock/5bf943c85cac7622ae783d85/index'
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShoppingMaillInfo:BASEURL,// 商城首页信息
    getGoodsInfo:BASEURL+'getGoodsInfo',
    registerUser : LOCALURL+'user/register',  //用户注册接口
    login: LOCALURL+'user/login',  //用户登陆接口
    getDetailGoodsInfo: LOCALURL+'goods/getDetailGoodsInfo',  //获取商品详情
    getCateGoryList: LOCALURL+'goods/getCateGoryList',  //获取大类信息
    getCategorySubList: LOCALURL+'goods/getCategorySubList',  //获取小类信息
    getGoodsListByCategorySubID: LOCALURL+'goods/getGoodsListByCategorySubID',  //获取小类商品信息
}

module.exports = URL