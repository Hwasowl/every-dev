<script setup>
import { computed } from 'vue'
import { categories } from '../data/categories.js'
import { articles, articlesByCategory, todaysArticle, articleById } from '../data/articles.js'
import { useLibrary } from '../composables/useLibrary.js'

const { inProgress, readCount, progressOf } = useLibrary()

const today = todaysArticle()
const greetText = (() => {
  const h = new Date().getHours()
  if (h < 11) return '출근길 5분'
  if (h < 18) return '잠깐 쉬며 한 조각'
  return '퇴근길에 읽기 좋은'
})()

// 이어보기: 가장 최근 진도가 있는 글 하나
const resume = computed(() => {
  const ids = inProgress.value
  if (!ids.length) return null
  const id = ids[ids.length - 1]
  return { article: articleById(id), pct: progressOf(id) }
})

const cats = computed(() =>
  categories.map((c) => {
    const list = articlesByCategory(c.id)
    return { ...c, total: list.length, read: readCount(list.map((a) => a.id)) }
  }),
)
</script>

<template>
  <div class="page">
    <div class="greet">{{ greetText }}</div>
    <h1 class="page-title">오늘의 CS<br />한 조각</h1>

    <!-- 오늘의 지식 -->
    <RouterLink :to="`/article/${today.id}`" class="hero">
      <div class="kicker">{{ today.categoryId.toUpperCase() }}</div>
      <h2>{{ today.title }}</h2>
      <p>{{ today.summary }}</p>
      <div class="go">읽기 →</div>
    </RouterLink>

    <!-- 이어보기 -->
    <RouterLink v-if="resume" :to="`/article/${resume.article.id}`" class="resume">
      <span class="pct">{{ resume.pct }}%</span>
      <div class="l">이어보기</div>
      <div class="t">{{ resume.article.title }}</div>
      <div class="bar"><i :style="{ width: resume.pct + '%' }"></i></div>
    </RouterLink>

    <!-- 카테고리 -->
    <div class="section-label" style="margin: 26px 2px 6px">카테고리</div>
    <div class="clist">
      <RouterLink v-for="c in cats" :key="c.id" :to="`/category/${c.id}`" class="crow">
        <span class="acc" :style="{ background: c.accent }"></span>
        <span class="cnm">{{ c.name }}</span>
        <span class="cmeta">
          <b v-if="c.read">{{ c.read }}</b><template v-if="c.read"> / </template>{{ c.total }}
        </span>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.hero {
  display: block;
  background: var(--bg-elev);
  border-radius: 20px;
  padding: 20px;
  margin-top: 22px;
  position: relative;
  overflow: hidden;
}
.hero::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--blue); }
.hero .kicker { font-size: 11px; font-weight: 800; color: var(--blue); letter-spacing: 1.2px; }
.hero h2 { font-size: 19px; font-weight: 800; color: var(--text); margin: 11px 0 7px; letter-spacing: -0.3px; line-height: 1.4; }
.hero p { font-size: 13px; color: var(--text-3); line-height: 1.55; }
.hero .go { margin-top: 16px; font-size: 12.5px; font-weight: 800; color: var(--blue-soft); }

.resume { display: block; margin-top: 13px; background: var(--bg-elev); border-radius: 16px; padding: 15px 17px; }
.resume .pct { float: right; font-size: 11px; color: var(--text-4); font-weight: 700; }
.resume .l { font-size: 11px; color: var(--text-4); font-weight: 800; letter-spacing: 0.4px; }
.resume .t { font-size: 14px; font-weight: 700; color: #e7e9ed; margin: 6px 0 11px; letter-spacing: -0.2px; }
.bar { height: 5px; background: #23262e; border-radius: 5px; overflow: hidden; }
.bar > i { display: block; height: 100%; background: var(--amber); border-radius: 5px; }

.clist { display: flex; flex-direction: column; }
.crow { display: flex; align-items: center; padding: 15px 2px; border-bottom: 1px solid var(--line); }
.crow:last-child { border-bottom: none; }
.acc { width: 3px; height: 17px; border-radius: 3px; margin-right: 13px; }
.cnm { font-size: 15px; font-weight: 700; color: #e7e9ed; letter-spacing: -0.2px; }
.cmeta { margin-left: auto; font-size: 12px; color: var(--text-4); font-weight: 700; }
.cmeta b { color: var(--blue); }
</style>
