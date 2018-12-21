const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()
router.get('/',async(ctx)=>{
    ctx.body="这是用户操作首页"
})

router.post('/register',async(ctx)=>{
   
    const User = mongoose.model('User')
    let newUser = new User(ctx.request.body)

    await newUser.save().then(()=>{
        ctx.body={
            code:200,
            message:'注册成功'
        }
    }).catch(error=>{
        ctx.body={
            code:500,
            message:error
        }
    })
})

//登陆
router.post('/login',async(ctx)=>{
    let loginUser = ctx.request.body //获取前端传过来的数据
    console.log(loginUser)
    let userName = loginUser.userName
    let password = loginUser.password

 
    const User = mongoose.model('User')   //引入User的model
//比对名字
    await User.findOne({userName:userName}).exec().then(async(result)=>{
        console.log(result)
        if(result){
            let newUser = new User() 
            await newUser.comparePassword(password,result.password) //比对密码
            .then(isMatch=>{  //如果正确 返回isMatch
                ctx.body={code:200,message:isMatch}
            })
            .catch(error=>{
                console.log(error)
                ctx.body={code:500,message:error}
            })
        }else{
            ctx.body={code:200,message:'用户名不存在'}
        }
    }).catch(error=>{
        console.log(error)
        ctx.body={code:500,message:error}
    })

})

module.exports =router