<template>
  <ui-page
    :touch-actions="['swiper']"
    :header="{
      iconName: 'guanbi',
      iconStyle: {
        fontWeight: 'bold',
        fontSize: 'var(--font-size-header)',
      },
    }"
    :page="{
      style: {
        backgroundColor: 'var(--color-bg-primary)',
      },
    }"
  >
    <div class="login-page">
      <h3 class="login-page-title">密码登录</h3>
      <div class="username-input">
        <input
          type="text"
          :value="username"
          placeholder="请输入用户名"
          @input="(e) => handleInput(e, 'username')"
        />
        <tg-icon
          name="cuowu"
          size="large"
          @click="clear('username')"
          v-show="username"
        ></tg-icon>
      </div>
      <div class="password-input">
        <input
          :type="isShowPass ? 'text' : 'password'"
          :value="password"
          placeholder="请输入密码"
          @input="(e) => handleInput(e, 'password')"
        />
        <tg-icon
          name="cuowu"
          size="large"
          v-show="password"
          style="margin-right: 0.2rem"
          @click="clear('password')"
        ></tg-icon>
        <tg-icon
          name="kejian"
          size="large"
          v-if="isShowPass"
          @click="isShowPass = !isShowPass"
        ></tg-icon>
        <tg-icon
          name="bukejian"
          size="large"
          v-else
          @click="isShowPass = !isShowPass"
        ></tg-icon>
      </div>
      <div
        class="login-button"
        :class="{ 'login-disabled': !password || !username }"
        @click="handleLogin"
      >
        登录
      </div>
    </div>
  </ui-page>
</template>

<script>
import _ from "lodash";
import localCahce from "@/utils/localCache";
export default {
  name: "page-login",
  data() {
    return {
      username: "",
      password: "",
      isShowPass: false,
    };
  },
  methods: {
    handleInput(e, field) {
      // console.log(e, field);
      this[field] = e.target.value;
    },
    clear(field) {
      this[field] = "";
    },
    handleLogin: _.debounce(function () {
      this.$http({
        url: "/login",
        method: "POST",
        data: {
          username: this.username,
          password: this.password,
        },
      }).then((res) => {
        // console.log(res);
        localCahce.setItem("isLogin", "true");
        localCahce.setItem("token", res.data.token);
        this.$router.push({ name: this.$route.query.name });
      });
    }, 300),
  },
};
</script>

<style lang="scss" scoped>
.login-page {
  padding: 64px 80px;
  .login-page-title {
    font-size: var(--font-size-header);
    color: var(--color-text-primary);
    margin-bottom: 48px;
    font-weight: 600;
  }
  .username-input,
  .password-input {
    height: 90px;
    background-color: var(--color-bg-sub);
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 30px;
    margin-bottom: 30px;
    border-radius: 12px;
    input {
      flex-grow: 1;
      outline: none;
      border: none;
      height: 90px;
      line-height: 90px;
      background-color: transparent;
    }
  }
  .login-button {
    background-color: var(--color-primary);
    color: var(--color-text-reverse);
    height: 90px;
    line-height: 90px;
    text-align: center;
    margin-bottom: 30px;
    border-radius: 12px;
  }
  .login-disabled {
    background-color: var(--color-bg-disabled);
  }
}
</style>
