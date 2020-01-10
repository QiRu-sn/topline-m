<template>
    <div class="loginContainer">
        <van-nav-bar title="登录"/>
        <ValidationObserver ref="myForm">
            <ValidationProvider name='手机号' rules='required|mobile'>
                <van-field
                v-model="user.mobile"
                  clearable
                  placeholder="请输入手机号"
                />
            </ValidationProvider>
            <ValidationProvider name='验证码' rules='required|code'>
                <van-field placeholder="请输入密码" v-model="user.code">
                  <van-button  v-if="isCountShow" slot="button" size="small" class="getCode">
                      <van-count-down
                        :time="1000*60"
                        format="ss s后重新发送"
                        @finish='isCountShow=false'
                      />
                  </van-button>
                  <van-button v-else
                    slot="button"
                    size="small"
                    class="getCode"
                    @click="getmobileCode">
                    获取验证码
                  </van-button>
                </van-field>
            </ValidationProvider>
        </ValidationObserver>
        <div class="btnLogin">
            <van-button type="info" @click="userLogin">登录</van-button>
        </div>
        <div class="footer">隐私条款</div>
    </div>
</template>

<script>
import { login, code } from '@/api/user.js'
import { validate } from 'vee-validate'
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
      const success = await this.$refs.myForm.validate()

      if (!success) {
        // 这里加定时器的原因是因为获取验证失败的结果有延迟问题，并不是我们的原因
        setTimeout(() => {
          const errors = this.$refs.myForm.errors
          // forEach 无法停止
          // find 方法会遍历数组，对每个元素执行方法中的条件判定
          const item = Object.values(errors).find(item => item[0])
          this.$toast(item[0])
        }, 100)
        return
      }

      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '登录中...'
      })
      try {
        let { data } = await login(this.user)
        // 登录成功将token存入容器中
        this.$store.commit('setUser', data.data)

        this.$toast.success('登录成功')
        this.$router.push('/')
      } catch (error) {
        this.$toast.fail('登录失败')
      }
    },
    // 获取验证码功能
    async getmobileCode () {
      // 获取手机号码
      const { mobile } = this.user
      // 校验手机号码是否正确
      const { valid, errors } = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })
      // 如果验证失败，提示错误消息，停止发送验证码
      if (!valid) {
        this.$toast(errors[0])
        return
      }
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
