<script setup>
import { computed } from 'vue'
import { articleById } from '../data/articles.js'
import { useLibrary } from '../composables/useLibrary.js'
import ArticleListItem from '../components/ArticleListItem.vue'

const { bookmarks } = useLibrary()
const list = computed(() => bookmarks.value.map(articleById).filter(Boolean))
</script>

<template>
  <div class="page">
    <h1 class="page-title" style="margin-bottom: 4px">저장한 글</h1>
    <div class="greet">나중에 다시 볼 지식</div>

    <div v-if="list.length" class="list">
      <ArticleListItem v-for="a in list" :key="a.id" :article="a" />
    </div>
    <div v-else class="empty">
      <p>아직 저장한 글이 없어요.</p>
      <span>글을 읽다가 ‘저장’을 누르면 여기 모입니다.</span>
    </div>
  </div>
</template>

<style scoped>
.list { margin-top: 18px; }
.empty { margin-top: 80px; text-align: center; }
.empty p { font-size: 15px; font-weight: 700; color: var(--text-3); }
.empty span { display: block; font-size: 13px; color: var(--text-4); margin-top: 8px; }
</style>
