<template>
  <el-container class="container">
    <el-aside width="250px">
      <div class="title">Gateway Admin</div>
      <el-divider>{{ curRouteData.name }}</el-divider>
      <el-scrollbar style="height: calc(100vh - 105px)">
        <el-menu :default-active="curRouteData.url" :router="true">
          <el-menu-item
            v-for="{ title, url, icon } in menuData"
            :key="url"
            :index="url"
          >
            <el-icon :size="15" style="margin-left: 25px">
              <component :is="icon" />
            </el-icon>
            <span>{{ title }}</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-main>
      <div>head</div>
      <div>
        <router-view v-slot="{ Component, route }">
          <Transition :name="route.meta.transition as string || 'fade'">
            <component :is="Component" />
          </Transition>
        </router-view>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { UserFilled, HelpFilled } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
const route = useRoute();
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
const getCurPath = (router: string) => {
  if (!router) return '';
  return router.split('/').pop() ?? '';
};
const getNameByPath = (path: string) => {
  const index = menuData.findIndex((item) => item.url === path);
  if (index > -1) {
    return menuData[index].title;
  }
  return '';
};
const pageLoadUrl = getCurPath(route.path);
const curRouteData = ref({
  name: getNameByPath(pageLoadUrl),
  url: pageLoadUrl,
});
watch(
  () => route.path,
  (url) => {
    const curUrl = getCurPath(url);
    curRouteData.value = {
      url: curUrl,
      name: getNameByPath(curUrl),
    };
  }
);
</script>

<style lang="scss">
.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
}
</style>
<style lang="scss" scoped>
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
