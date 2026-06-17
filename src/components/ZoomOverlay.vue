<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  open: Boolean,
  type: String, // 'code' | 'diagram'
  html: String,
})
const emit = defineEmits(['close'])

const scale = ref(1)
watch(
  () => props.open,
  (v) => {
    if (v) scale.value = props.type === 'diagram' ? 1.4 : 1.1
  },
)
const zoomIn = () => (scale.value = Math.min(3, scale.value + 0.25))
const zoomOut = () => (scale.value = Math.max(0.5, scale.value - 0.25))
</script>

<template>
  <Teleport to="body">
    <Transition name="ovl">
      <div v-if="open" class="ovl" @click.self="emit('close')">
        <div class="ovl-top">
          <button class="x" @click="emit('close')">✕</button>
          <span class="lab">{{ type === 'diagram' ? '다이어그램' : '코드' }} 확대해서 보기</span>
          <div class="zoom">
            <button @click="zoomOut">−</button>
            <button @click="zoomIn">+</button>
          </div>
        </div>
        <div class="ovl-stage thin-scroll">
          <div class="ovl-inner" :class="type" :style="{ transform: `scale(${scale})` }" v-html="html"></div>
        </div>
        <div class="ovl-foot">밀어서 이동하고, +/− 로 확대, 빈 곳을 탭하면 닫힙니다</div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.ovl {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(6, 7, 10, 0.94);
  backdrop-filter: blur(3px);
  display: flex;
  flex-direction: column;
}
.ovl-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  flex: none;
}
.x { color: var(--text); font-size: 20px; font-weight: 700; width: 34px; text-align: left; }
.lab { font-size: 11px; font-weight: 800; color: var(--text-3); letter-spacing: 1px; }
.zoom { display: flex; gap: 8px; }
.zoom button {
  width: 34px; height: 34px; border-radius: 10px;
  background: #1B2233; border: 1px solid #2A3550; color: var(--blue-soft);
  font-size: 18px; font-weight: 700;
}
.ovl-stage { flex: 1; overflow: auto; padding: 12px; }
.ovl-inner { transform-origin: top left; transition: transform 0.12s ease; display: inline-block; min-width: 100%; }
.ovl-inner.code :deep(pre) {
  background: var(--bg-code); border: 1px solid var(--line);
  border-radius: 14px; padding: 18px; margin: 0;
  font-family: 'JetBrains Mono', monospace; font-size: 13px; line-height: 1.85; white-space: pre;
}
.ovl-inner.diagram :deep(svg) { max-width: none; height: auto; }
.ovl-foot { flex: none; text-align: center; color: var(--text-4); font-size: 11.5px; font-weight: 700; padding: 14px 0 24px; }

.ovl-enter-active, .ovl-leave-active { transition: opacity 0.2s ease; }
.ovl-enter-from, .ovl-leave-to { opacity: 0; }
</style>
