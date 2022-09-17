<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-button type="primary">Default</el-button>
    <HelloWorld msg="sss" />
    <ComponentTest test="aaa" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '../components/HelloWorld.vue';
import ComponentTest from '../components/ComponentTest/index.vue';

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
    ComponentTest,
  },
});
</script>
