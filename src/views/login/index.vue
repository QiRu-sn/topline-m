<template>
    <div class="loginContainer">
        <van-nav-bar title="登录"/>
        <van-cell-group>
            <van-field
              clearable
              placeholder="请输入手机号"
            />
            <van-field placeholder="请输入密码">
                <van-button slot="button" size="small" class="getCode">获取验证码</van-button>
            </van-field>
        </van-cell-group>
        <div class="btnLogin">
            <van-button type="info">登录</van-button>
        </div>
        <div class="footer">隐私条款</div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.loginContainer{
    height: 100vh;
    position: relative;
}
.van-nav-bar{
    height:64px;
    line-height: 64px;
}
.getCode{
    background: #ededed;
    border-radius: 15px;
}
.btnLogin{
    padding: 27px 16px;
    .van-button{
        width: 100%;
        border-radius: 10px;
    }
}
.footer{
    position: absolute;
    bottom: 27px;
    font-size: 12px;
    color:#949596;
    width: 100%;
    text-align: center;
}
</style>
