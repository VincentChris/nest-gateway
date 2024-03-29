import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// dom自带样式初始化
import 'normalize.css/normalize.css';

createApp(App).use(router).mount('#app');
