<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { articleById } from '../data/articles.js'
import { categoryOf } from '../data/categories.js'
import { useLibrary } from '../composables/useLibrary.js'
import MarkdownView from '../components/MarkdownView.vue'

const route = useRoute()
const router = useRouter()
const { isBookmarked, toggleBookmark, setProgress, markRead, isRead } = useLibrary()

const article = computed(() => articleById(route.params.id))
const category = computed(() => (article.value ? categoryOf(article.value.categoryId) : null))
const bookmarked = computed(() => (article.value ? isBookmarked(article.value.id) : false))
const read = computed(() => (article.value ? isRead(article.value.id) : false))

const progress = ref(0)
let ticking = false

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const doc = document.documentElement
    const max = doc.scrollHeight - doc.clientHeight
    const pct = max > 0 ? (doc.scrollTop / max) * 100 : 100
    progress.value = Math.min(100, Math.max(0, pct))
    if (article.value) {
      setProgress(article.value.id, progress.value)
      if (progress.value >= 95) markRead(article.value.id)
    }
    ticking = false
  })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
watch(() => route.params.id, () => {
  progress.value = 0
  window.scrollTo(0, 0)
})
</script>

<template>
  <div v-if="article">
    <!-- 상단 바 -->
    <header class="topbar">
      <button class="back" @click="router.back()">←</button>
      <div class="ptrack"><i :style="{ width: progress + '%' }"></i></div>
      <button class="save" :class="{ on: bookmarked }" @click="toggleBookmark(article.id)">
        {{ bookmarked ? '저장됨' : '저장' }}
      </button>
    </header>

    <article class="doc">
      <div class="kicker">{{ category?.name }}</div>
      <h1 class="title">{{ article.title }}</h1>
      <div class="meta">{{ article.minutes }}분 읽기</div>

      <MarkdownView :source="article.body" />

      <div class="done" :class="{ on: read }">
        <b>{{ read ? '읽음 완료 ✓' : '끝까지 읽으면 자동 저장돼요' }}</b>
        <span>스크롤 진도와 읽음 상태는 이 기기에 기억됩니다</span>
      </div>
    </article>
  </div>
</template>

<style scoped>
.topbar {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: var(--maxw);
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  background: rgba(15, 16, 20, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line-soft);
  z-index: 30;
}
.back { color: var(--text-3); font-size: 22px; font-weight: 700; line-height: 1; }
.ptrack { flex: 1; height: 4px; background: #23262e; border-radius: 4px; overflow: hidden; }
.ptrack > i { display: block; height: 100%; background: var(--blue); border-radius: 4px; transition: width 0.1s linear; }
.save { font-size: 13px; font-weight: 700; color: var(--text-4); white-space: nowrap; }
.save.on { color: var(--blue); }

.doc { padding: 70px 22px 60px; }
.kicker { font-size: 11px; font-weight: 800; color: var(--blue); letter-spacing: 1.4px; }
.title { font-size: 24px; font-weight: 800; color: var(--text); line-height: 1.34; letter-spacing: -0.6px; margin: 11px 0 12px; }
.meta { font-size: 12.5px; color: var(--text-4); font-weight: 700; border-bottom: 1px solid var(--line); padding-bottom: 18px; margin-bottom: 6px; }

.done { margin-top: 30px; background: var(--bg-elev); border-radius: 16px; padding: 18px; text-align: center; }
.done b { color: var(--text-3); font-weight: 800; font-size: 14px; }
.done.on b { color: var(--green); }
.done span { display: block; color: var(--text-4); font-size: 12px; margin-top: 6px; }
</style>
