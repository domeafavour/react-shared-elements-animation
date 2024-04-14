import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import ListPage from './components/ListPage.vue';
import ItemPage from './components/ItemPage.vue';

const router = createRouter({
  history: createWebHistory(),
  strict: true,
  routes: [
    {
      path: '/',
      component: ListPage,
    },
    {
      path: '/item/:id',
      component: ItemPage,
    },
  ],
});

const app = createApp(App);
app.use(router);
app.mount('#app');
