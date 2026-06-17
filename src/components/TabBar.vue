<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const tabs = [
  { name: 'home', label: '홈', path: '/' },
  { name: 'categories', label: '카테고리', path: '/categories' },
  { name: 'bookmarks', label: '저장', path: '/bookmarks' },
]
const isActive = (t) => route.name === t.name
</script>

<template>
  <nav class="tabbar">
    <RouterLink
      v-for="t in tabs"
      :key="t.name"
      :to="t.path"
      class="tab"
      :class="{ active: isActive(t) }"
    >
      <span class="dot"></span>
      {{ t.label }}
    </RouterLink>
  </nav>
</template>

<style scoped>
.tabbar {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: var(--maxw);
  height: var(--tabh);
  display: flex;
  background: rgba(15, 16, 20, 0.92);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--line);
  z-index: 40;
}
.tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 700;
  color: var(--text-4);
  letter-spacing: 0.2px;
  padding-bottom: max(0px, env(safe-area-inset-bottom));
}
.tab .dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: transparent;
  transition: background 0.15s ease;
}
.tab.active { color: var(--text); }
.tab.active .dot { background: var(--blue); }
</style>
