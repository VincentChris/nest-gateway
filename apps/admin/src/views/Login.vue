<template>
  <el-row class="container">
    <el-col
      :xs="spanConfig.xs"
      :sm="spanConfig.sm"
      :md="spanConfig.md"
      :xl="spanConfig.xl"
    >
      <el-form :model="form" class="login-form">
        <h1 class="font-color title">Hello !</h1>
        <h3 class="font-color tips">欢迎来到Gateway Admin</h3>
        <el-form-item>
          <el-input
            :prefix-icon="User"
            size="large"
            v-model="form.name"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            :prefix-icon="Lock"
            size="large"
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button size="large" type="primary" @click="onSubmit">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'Login',
  data: function () {
    return {
      User,
      Lock,
      form: {
        name: undefined,
        password: undefined,
      },
      spanConfig: {
        xs: {
          offset: 0,
          span: 24,
        },
        sm: {
          offset: 8,
          span: 16,
        },
        md: {
          offset: 12,
          span: 12,
        },
        lg: {
          offset: 12,
          span: 12,
        },
        xl: {
          offset: 15,
          span: 9,
        },
      },
    };
  },
  methods: {
    onSubmit(e: MouseEvent) {
      console.log(e);
    },
  },
});
</script>
<style scoped lang="scss">
.container {
  background: url('../assets/bg.jpg') 50% fixed no-repeat;
  height: 100vh;
  background-size: cover;
}
.login-form {
  background: url('../assets/login-form.png');
  background-size: 100% 100%;
  padding: 4.5vh 4.5vw;
  margin: calc(45.5vh - 182px) 5vw;
}

.font-color {
  color: var(--el-color-white);
}

.title {
  font-size: 54px;
  font-weight: 500;
}

.tips {
  margin-top: 29px;
  font-size: 26px;
  font-weight: 400;
}
</style>
