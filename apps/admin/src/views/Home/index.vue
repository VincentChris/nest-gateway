<template>
  <el-container class="container">
    <Transition name="aside-fade">
      <el-aside :width="asideWidth" v-show="showAside">
        <div class="title no-wrap">Gateway Admin</div>
        <el-divider class="no-wrap">
          {{ curRouteData.title }}
        </el-divider>
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
      </el-aside>
    </Transition>
    <el-main>
      <el-row justify="space-between" class="right-head">
        <el-col :span="8" class="left-nav">
          <el-icon class="toggle-icon" @click="toogleShowAside">
            <Transition name="slide-fade">
              <Expand v-if="showAside" />
              <Fold v-else />
            </Transition>
          </el-icon>
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item class="bread-item">
              <el-icon :size="15" style="margin-left: 25px">
                <component :is="curRouteData.icon" />
              </el-icon>
              {{ curRouteData.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
      <el-divider />
      <div>
        <el-tabs
          v-model="editableTabsValue"
          type="card"
          editable
          class="demo-tabs"
          @edit="handleTabsEdit"
          @tab-click="onTabClick"
        >
          <el-tab-pane
            v-for="item in editableTabs"
            :key="item.url"
            :label="item.title"
            :name="item.url"
          >
            <router-view v-slot="{ Component, route }">
              <Transition :name="route.meta.transition as string || 'fade'">
                <component :is="Component" />
              </Transition>
            </router-view>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import {
  UserFilled,
  HelpFilled,
  Expand,
  ArrowRight,
  Fold,
} from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch, markRaw } from 'vue';
import { TabsPaneContext } from 'element-plus/es';
const route = useRoute();
const router = useRouter();
const menuData = [
  {
    title: '用户',
    url: 'user',
    icon: markRaw(UserFilled),
  },
  {
    title: '权限',
    url: 'authority',
    icon: markRaw(HelpFilled),
  },
];
const getCurPath = (router: string) => {
  if (!router) return '';
  return router.split('/')[2] ?? '';
};
const getRouteDataByPath = (path: string) => {
  const index = menuData.findIndex((item) => item.url === path);
  if (index > -1) {
    return menuData[index];
  }
  return menuData[0];
};
const pageLoadUrl = getCurPath(route.path);
const curRouteData = ref(getRouteDataByPath(pageLoadUrl));
const showAside = ref(true);
const asideWidth = '250px';
const toogleShowAside = () => {
  showAside.value = !showAside.value;
};
const editableTabsValue = ref(pageLoadUrl);
const editableTabs = ref(menuData);
const handleTabsEdit: any = (targetName: string, action: 'remove' | 'add') => {
  if (action === 'add') {
  } else if (action === 'remove') {
  }
};

const onTabClick = ({ props: { name } }: TabsPaneContext) => {
  router.push({
    path: `/home/${name as string}`,
    query: {
      ...route.query,
    },
  });
};

watch(
  () => route.path,
  (url) => {
    const curUrl = getCurPath(url);
    curRouteData.value = getRouteDataByPath(curUrl);
  }
);
</script>
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
.right-head {
  height: 35px;
}
.toggle-icon {
  cursor: pointer;
}
.left-nav {
  display: flex;
}
.bread-item {
  & > :deep(span) {
    display: flex;
  }
}

.no-wrap {
  white-space: nowrap;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}

.aside-fade-enter-active {
  transition: all 0.3s ease-out;
}

.aside-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.aside-fade-enter-from,
.aside-fade-leave-to {
  width: 0;
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
}
</style>
