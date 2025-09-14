import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import i18n from './i18n/i18n';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/main.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(i18n);
app.use(ElementPlus);
app.mount('#app');
