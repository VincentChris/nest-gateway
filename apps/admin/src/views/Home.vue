<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-button>Default</el-button>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <ComponentTest test="sss" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '../components/HelloWorld.vue';
import ComponentTest from '../components/ComponentTest/index.vue'

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
    ComponentTest
  },
});
</script>
