import { defineConfig } from 'umi';

export default defineConfig({
  base: '/react-shared-elements-animation',
  // https://github.com/umijs/umi/issues/10959
  jsMinifier: 'terser',
  hash: true,
  routes: [
    { path: '/', component: 'home', wrappers: ['@/layouts/HomeLayout'] },
    { path: '/docs', component: 'docs', wrappers: ['@/layouts/DocsLayout'] },
    { path: '/photos', component: 'photos' },
    { path: '/photos/:id', component: 'photos/detail' },
  ],
  npmClient: 'pnpm',
});
