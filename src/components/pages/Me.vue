<template>
    <div>
        <div>
            <van-nav-bar  title="会员中心" />
        </div>
        <div class="top">
           <img src="http://t2.hddhhn.com/uploads/tu/201812/391/1.jpg" class="top_img" />
        </div>
        <div class="login">
            <div><van-button type="warning">我要登录</van-button></div>
            <div><van-button type="primary">我要注册</van-button></div>
        </div>
        <div>
            <van-cell-group>
                <van-cell title="会员卡" is-link />
                <van-cell title="地址管理" is-link  />
                <van-cell title="我的订单" is-link  />
                <van-cell title="会员权益" is-link />
                <van-cell title="联系我们" is-link  />
            </van-cell-group>

        </div>

    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .top_img{
        width:140px;
        height: 140px;
        border-radius:50%;
    }
    .top{
        height:5rem;
        text-align: center;
        padding-top:2rem;
        background-color: #EEA2AD;
    }
    .login{
        display: flex;
        flex-direction: row;
        background-color: #fff;
        padding:10px;
        margin-top: 50px;
    }
    .login div{
        flex:1;
        text-align: center;
    }
</style>