<template>
    <div class="loginContainer">
        <van-nav-bar title="登录"/>
        <van-cell-group>
            <van-field
            v-model="user.mobile"
              clearable
              placeholder="请输入手机号"
            />
            <van-field placeholder="请输入密码" v-model="user.code">
              <van-button  v-if="isCountShow" slot="button" size="small" class="getCode">
                  <van-count-down
                    :time="1000*60"
                    format="ss s后重新发送"
                    @finish='isCountShow=false'
                  />
              </van-button>
              <van-button v-else slot="button" size="small" class="getCode" @click="getmobileCode">获取验证码</van-button>
            </van-field>
        </van-cell-group>
        <div class="btnLogin">
            <van-button type="info" @click="userLogin">登录</van-button>
        </div>
        <div class="footer">隐私条款</div>
    </div>
</template>

<script>
import { login, code } from '@/api/user.js'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isCountShow: false
    }
  },
  methods: {
    // 登录功能
    async userLogin () {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '登录中...'
      })
      try {
        await login(this.user)
        this.$toast.success('登录成功')
      } catch (error) {
        this.$toast.fail('登录失败')
      }
    },
    // 获取验证码功能
    async getmobileCode () {
      // 获取手机号码
      const { mobile } = this.user
      // 校验手机号码是否正确

      // 发送验证码
      try {
        // 显示倒计时
        this.isCountShow = true
        // 发送验证码
        await code(mobile)
      } catch (error) {
        this.isCountShow = false
        // 判断如果失败状态码为429，提示请勿重新发送
        if (error.response.status === 429) {
          this.$toast('请勿频繁发送')
        }
        this.$toast('发送失败')
      }
    }
  }
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
