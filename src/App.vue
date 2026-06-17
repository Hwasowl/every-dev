<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TabBar from './components/TabBar.vue'

const route = useRoute()
// 글 읽기 화면은 몰입을 위해 하단 탭을 숨긴다.
const showTab = computed(() => route.name !== 'article')
</script>

<template>
  <RouterView v-slot="{ Component }">
    <component :is="Component" />
  </RouterView>
  <TabBar v-if="showTab" />
</template>
