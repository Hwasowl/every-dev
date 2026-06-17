<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { categoryOf } from '../data/categories.js'
import { articlesByCategory } from '../data/articles.js'
import { useLibrary } from '../composables/useLibrary.js'
import ArticleListItem from '../components/ArticleListItem.vue'

const route = useRoute()
const router = useRouter()
const { readCount } = useLibrary()

const category = computed(() => categoryOf(route.params.id))
const list = computed(() => articlesByCategory(route.params.id))
const read = computed(() => readCount(list.value.map((a) => a.id)))
</script>

<template>
  <div class="page">
    <button class="back" @click="router.back()">← 뒤로</button>
    <h1 class="page-title" style="margin-top: 14px">{{ category?.name }}</h1>
    <div class="greet">{{ list.length }}개 중 {{ read }}개 읽음</div>

    <div class="list">
      <ArticleListItem v-for="a in list" :key="a.id" :article="a" />
    </div>
  </div>
</template>

<style scoped>
.back { font-size: 14px; color: var(--text-3); font-weight: 700; }
.list { margin-top: 18px; }
</style>
