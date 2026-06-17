<script setup>
import { computed } from 'vue'
import { categories } from '../data/categories.js'
import { articlesByCategory } from '../data/articles.js'
import { useLibrary } from '../composables/useLibrary.js'

const { readCount } = useLibrary()

const cats = computed(() =>
  categories.map((c) => {
    const list = articlesByCategory(c.id)
    return { ...c, total: list.length, read: readCount(list.map((a) => a.id)) }
  }),
)
</script>

<template>
  <div class="page">
    <h1 class="page-title" style="margin-bottom: 4px">카테고리</h1>
    <div class="greet">분야별로 골라 읽기</div>

    <div class="clist">
      <RouterLink v-for="c in cats" :key="c.id" :to="`/category/${c.id}`" class="card">
        <span class="acc" :style="{ background: c.accent }"></span>
        <div class="info">
          <div class="nm">{{ c.name }}</div>
          <div class="meta">{{ c.read }} / {{ c.total }} 읽음</div>
        </div>
        <div class="bar"><i :style="{ width: (c.total ? (c.read / c.total) * 100 : 0) + '%', background: c.accent }"></i></div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.clist { display: flex; flex-direction: column; gap: 12px; margin-top: 24px; }
.card {
  display: block; position: relative;
  background: var(--bg-elev); border-radius: 18px; padding: 18px 18px 16px 22px;
}
.acc { position: absolute; left: 0; top: 16px; bottom: 16px; width: 3px; border-radius: 3px; }
.info { display: flex; align-items: baseline; justify-content: space-between; }
.nm { font-size: 16px; font-weight: 800; color: #edeff2; letter-spacing: -0.3px; }
.meta { font-size: 12px; color: var(--text-4); font-weight: 700; }
.bar { height: 5px; background: #23262e; border-radius: 5px; overflow: hidden; margin-top: 13px; }
.bar > i { display: block; height: 100%; border-radius: 5px; }
</style>
