<script setup>
import { computed } from 'vue'
import { useLibrary } from '../composables/useLibrary.js'

const props = defineProps({ article: Object })
const { isRead, progressOf } = useLibrary()

const read = computed(() => isRead(props.article.id))
const progress = computed(() => progressOf(props.article.id))
const state = computed(() => {
  if (read.value) return 'read'
  if (progress.value > 0) return 'progress'
  return 'unread'
})
</script>

<template>
  <RouterLink :to="`/article/${article.id}`" class="item" :class="state">
    <span class="bul"></span>
    <div class="main">
      <div class="t">{{ article.title }}</div>
      <div class="d">{{ article.summary }}</div>
      <span class="badge">
        <template v-if="state === 'read'">읽음</template>
        <template v-else-if="state === 'progress'">{{ progress }}% 읽는 중</template>
        <template v-else>안 읽음 {{ article.minutes }}분</template>
      </span>
    </div>
  </RouterLink>
</template>

<style scoped>
.item { display: flex; align-items: flex-start; padding: 16px 2px; border-bottom: 1px solid var(--line); }
.bul { width: 7px; height: 7px; border-radius: 50%; margin: 7px 13px 0 0; flex: none; }
.unread .bul { background: var(--blue); box-shadow: 0 0 0 4px rgba(74, 147, 255, 0.15); }
.progress .bul { background: var(--amber); box-shadow: 0 0 0 4px rgba(245, 166, 35, 0.13); }
.read .bul { background: #2a2d35; }

.main { flex: 1; min-width: 0; }
.t { font-size: 15px; font-weight: 700; letter-spacing: -0.2px; }
.unread .t, .progress .t { color: #edeff2; }
.read .t { color: #646b76; }
.d { font-size: 12.5px; color: var(--text-4); margin-top: 4px; line-height: 1.5; }
.read .d { color: #454b54; }

.badge {
  font-size: 10.5px; font-weight: 800; letter-spacing: 0.3px;
  padding: 3px 8px; border-radius: 20px; margin-top: 9px; display: inline-block;
}
.unread .badge { color: var(--blue); background: rgba(74, 147, 255, 0.12); }
.progress .badge { color: var(--amber); background: rgba(245, 166, 35, 0.12); }
.read .badge { color: var(--text-4); background: #1a1c22; }
</style>
