<template>
  <el-container class="container">
    <el-aside width="250px">
      <div class="title">Gateway Admin</div>
      <el-divider>用户</el-divider>
      <el-scrollbar style="height: calc(100vh - 105px)">
        <el-menu :default-active="menuData[0].url">
          <el-menu-item
            v-for="{ title, url, icon } in menuData"
            :key="url"
            :index="url"
          >
            <el-icon :size="15" style="margin-left: 25px"
              ><component :is="icon"
            /></el-icon>
            <span>{{ title }}</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-main>
      <div>head</div>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { UserFilled, HelpFilled } from '@element-plus/icons-vue';
const menuData = [
  {
    title: '用户',
    url: 'user',
    icon: UserFilled,
  },
  {
    title: '权限',
    url: 'authority',
    icon: HelpFilled,
  },
];
</script>
<style lang="scss">
.container {
  height: 100vh;
}
.title {
  color: #515a6e;
  background-color: #fff;
  font-size: 20px;
  line-height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
