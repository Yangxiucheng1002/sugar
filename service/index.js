const Koa = require('koa')
const app = new Koa()
const { connect , initSchemas } = require('./database/init.js')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')  // 用于接收post请求的
const Router = require('koa-router')
const cors = require('koa2-cors') //跨域使用
let user = require('./appApi/user.js')
let goods = require('./appApi/goods.js')

//使用中间件
app.use(bodyParser())
app.use(cors())

//装在所有子路由
let router = new Router()
router.use('/user',user.routes())
router.use('/goods',goods.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())


;(async ()=>{
    await connect()
    initSchemas()
})()

app.use(async(ctx)=>{
    ctx.body='<h1>Hello Koa2</h1>'
})

app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})