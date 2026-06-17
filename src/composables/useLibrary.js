import { reactive, computed } from 'vue'

// localStorage 가 곧 백엔드 없는 이 앱의 '캐시'. 읽음/진도/북마크를 한곳에서 관리.
const KEY = 'everydev:v1'

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {}
  } catch {
    return {}
  }
}

const initial = load()

// state.progress[id] = 0~100, state.read[id] = true, state.bookmark[id] = true
const state = reactive({
  read: initial.read || {},
  progress: initial.progress || {},
  bookmark: initial.bookmark || {},
})

function persist() {
  localStorage.setItem(KEY, JSON.stringify(state))
}

export function useLibrary() {
  const isRead = (id) => !!state.read[id]
  const isBookmarked = (id) => !!state.bookmark[id]
  const progressOf = (id) => state.progress[id] || 0

  function setProgress(id, pct) {
    const p = Math.min(100, Math.max(0, Math.round(pct)))
    // 진도는 뒤로 가지 않게 최댓값 유지
    if (p > (state.progress[id] || 0)) {
      state.progress[id] = p
      persist()
    }
  }

  function markRead(id) {
    state.read[id] = true
    state.progress[id] = 100
    persist()
  }

  function toggleBookmark(id) {
    if (state.bookmark[id]) delete state.bookmark[id]
    else state.bookmark[id] = true
    persist()
  }

  // 읽다 만 글: 진도 1~99, 아직 read 아님
  const inProgress = computed(() =>
    Object.keys(state.progress).filter(
      (id) => !state.read[id] && state.progress[id] > 0 && state.progress[id] < 100,
    ),
  )

  const bookmarks = computed(() => Object.keys(state.bookmark))
  const readCount = (ids) => ids.filter((id) => state.read[id]).length

  return {
    state,
    isRead,
    isBookmarked,
    progressOf,
    setProgress,
    markRead,
    toggleBookmark,
    inProgress,
    bookmarks,
    readCount,
  }
}
