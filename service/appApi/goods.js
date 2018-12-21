const Koa = require('koa')
const app = new Koa()

const Router = require('koa-router')
let router = new Router

const mongoose = require('mongoose')
const fs = require('fs')
// 所有物品接口
router.get('/insertAllGoodsInfo', async (ctx) => { //insertAllGoodsInfo 插入所有数据
  fs.readFile('./data_json/newGoods.json', 'utf-8', (err, data) => { //读取文件
    data = JSON.parse(data)
    let saveCount = 0 //一开始为0
    const Goods = mongoose.model('Goods') //使用mongoose刚才暴露的模块
    data.map((value, index) => {
      console.log(value)
      let newGoods = new Goods(value)
      newGoods.save().then(() => {
        saveCount++
        console.log('写入成功' + saveCount)
      }).catch((err) => {
        console.log(err)
      });
    })
  })
  ctx.body = '开始导入数据'
})
//商品大类接口
router.get('/insertAllCategory', async (ctx) => {
  fs.readFile('./data_json/category.json', 'utf-8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const Category = mongoose.model('Category')
    data.RECORDS.map((value, index) => {
      console.log(value)
      let newCategory = new Category(value)
      newCategory.save().then((result) => {
        saveCount++
        console.log('c插入成功：' + saveCount)
      }).catch((err) => {
        console.log(err)
      });
    })
  })
  ctx.body = '开始导入数据'
})

//商品子类接口
router.get('/insertAllCategorySub', async (ctx) => {
  fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const CategorySub = mongoose.model('CategorySub')
    data.RECORDS.map((value, index) => {
      let newCategorySub = new CategorySub(value)
      newCategorySub.save().then(() => {
        saveCount++
        console.log(saveCount)
      }).catch(error => {
        console.log(error)
      })
    })
  })
  ctx.body = "开始导入数据"
})

//商品详情接口
router.post('/getDetailGoodsInfo', async (ctx) => {
  try {
    let goodsId = ctx.request.body.goodsId //获取前端传过来的物品ID   ctx.request.body   获取全部数据
    const Goods = mongoose.model('Goods')
    let result = await Goods.findOne({
      ID: goodsId
    }).exec() //如果 exec() 找到了匹配的文本，则返回一个结果数组。否则，返回 null
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      message: err
    }
  }
})
// 获取类大别数据接口
router.get('/getCategoryList', async (ctx) => {
  try {
    const Category = mongoose.model('Category')
    let result = await Category.find().exec()
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      message: err
    }
  }
})
// 获取小类别数据接口
router.post('/getCategorySubList', async (ctx) => {
  try {
    let cateoryId = ctx.request.body.categoryId
    //let cateoryId=1
    const CategorySub = mongoose.model('CategorySub')
    let result = await CategorySub.find({MALL_CATEGORY_ID: cateoryId}).exec()
    ctx.body = {code: 200,message: result}
    console.log(result)
  } catch (error) {
    ctx.body = {code: 500,message: error}
    
  }
})
//根据类别获取商品列表    分页
router.post('/getGoodsListByCategorySubID', async (ctx) => {
  try {
    let categorySubId = ctx.request.body.categorySubId  //子类别ID
    let page = ctx.request.body.page  // 当前页数
    let num = 10   //每页显示数量
    let start = (page-1)*num   // 开始位置

    const Goods = mongoose.model('Goods')
    let result = await Goods.find({SUB_ID: categorySubId})
    .skip(start).limit(num).exec()  //.skip(start) 从哪儿开始   .limit(num) 每页显示数量
    ctx.body = {
      code: 200,
      message: result
    }

  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    }
  }
})
module.exports = router
