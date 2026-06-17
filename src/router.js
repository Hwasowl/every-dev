import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import CategoriesView from './views/CategoriesView.vue'
import CategoryView from './views/CategoryView.vue'
import ArticleView from './views/ArticleView.vue'
import BookmarksView from './views/BookmarksView.vue'

// GitHub Pages 정적 호스팅에서 새로고침 404를 피하려고 hash 라우팅 사용.
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/categories', name: 'categories', component: CategoriesView },
    { path: '/category/:id', name: 'category', component: CategoryView },
    { path: '/article/:id', name: 'article', component: ArticleView },
    { path: '/bookmarks', name: 'bookmarks', component: BookmarksView },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})
