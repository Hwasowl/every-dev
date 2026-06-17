<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import hljs from 'highlight.js/lib/common'
import 'highlight.js/styles/github-dark.css'
import { renderMarkdown } from '../lib/markdown.js'
import { initMermaid, mermaid } from '../lib/mermaidSetup.js'
import ZoomOverlay from './ZoomOverlay.vue'

const props = defineProps({ source: String })

const root = ref(null)
const overlay = ref({ open: false, type: 'code', html: '' })

function openOverlay(type, html) {
  overlay.value = { open: true, type, html }
}
function closeOverlay() {
  overlay.value.open = false
}

function expandButton(onClick) {
  const btn = document.createElement('button')
  btn.className = 'expand-btn'
  btn.type = 'button'
  btn.innerHTML = '<span>⤢</span> 크게'
  btn.addEventListener('click', onClick)
  return btn
}

async function enhance() {
  const el = root.value
  if (!el) return

  // 1) 코드 블록: 하이라이트 + 가로스크롤 + 페이드 + 확대버튼
  el.querySelectorAll('pre > code').forEach((code) => {
    if (code.dataset.enhanced) return
    code.dataset.enhanced = '1'
    hljs.highlightElement(code)
    const pre = code.parentElement
    pre.classList.add('thin-scroll')

    const wrap = document.createElement('div')
    wrap.className = 'code-wrap'
    pre.parentElement.insertBefore(wrap, pre)
    wrap.appendChild(pre)

    const fade = document.createElement('div')
    fade.className = 'code-fade'
    wrap.appendChild(fade)
    wrap.appendChild(expandButton(() => openOverlay('code', pre.outerHTML)))
  })

  // 2) mermaid: 렌더 후 확대버튼
  const nodes = [...el.querySelectorAll('.mermaid:not([data-processed])')]
  if (nodes.length) {
    initMermaid()
    try {
      await mermaid.run({ nodes })
    } catch (e) {
      // 렌더 실패 시 원본 텍스트 유지
    }
    nodes.forEach((n) => {
      if (n.parentElement?.classList.contains('mermaid-wrap')) return
      const wrap = document.createElement('div')
      wrap.className = 'mermaid-wrap'
      n.parentElement.insertBefore(wrap, n)
      wrap.appendChild(n)
      wrap.appendChild(expandButton(() => openOverlay('diagram', n.innerHTML)))
    })
  }
}

function render() {
  if (root.value) {
    root.value.innerHTML = renderMarkdown(props.source)
    nextTick(enhance)
  }
}

onMounted(render)
watch(() => props.source, render)
</script>

<template>
  <div>
    <div ref="root" class="markdown"></div>
    <ZoomOverlay v-bind="overlay" @close="closeOverlay" />
  </div>
</template>

<style>
.markdown { font-size: 14.5px; line-height: 1.75; color: var(--text-2); letter-spacing: -0.1px; }
.markdown p { margin: 13px 0; }
.markdown strong { color: var(--text); font-weight: 800; }
.markdown em { color: var(--blue); font-style: normal; font-weight: 700; }
.markdown a { color: var(--blue-soft); text-decoration: underline; text-underline-offset: 3px; }

.markdown h2 {
  font-size: 18px; font-weight: 800; color: #edeff2;
  margin: 32px 0 12px; letter-spacing: -0.3px;
}
.markdown h3 { font-size: 15.5px; font-weight: 800; color: #edeff2; margin: 24px 0 10px; }

.markdown ul, .markdown ol { margin: 12px 0; padding-left: 20px; }
.markdown li { margin: 6px 0; }

.markdown blockquote {
  border-left: 3px solid #2a3550;
  padding: 2px 0 2px 14px; margin: 16px 0; color: var(--text-3);
}

/* 인라인 코드 */
.markdown :not(pre) > code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.86em; background: #1b1e26; color: #9cc4ff;
  padding: 2px 6px; border-radius: 6px;
}

/* 코드 블록 */
.markdown .code-wrap { position: relative; margin: 16px 0; }
.markdown pre {
  background: var(--bg-code) !important;
  border: 1px solid var(--line);
  border-radius: 14px; padding: 15px 16px; margin: 0;
  overflow-x: auto;
  font-family: 'JetBrains Mono', monospace; font-size: 12.5px; line-height: 1.75;
}
.markdown pre code { font-family: inherit; background: none; padding: 0; font-size: inherit; }
.markdown .code-fade {
  position: absolute; top: 1px; right: 1px; bottom: 1px; width: 40px;
  pointer-events: none; border-radius: 0 14px 14px 0;
  background: linear-gradient(90deg, rgba(12, 13, 17, 0), var(--bg-code));
}

/* 확대 버튼 (코드/다이어그램 공용) */
.markdown .expand-btn {
  position: absolute; right: 9px; bottom: 9px;
  font-size: 10.5px; font-weight: 800; color: var(--blue-soft);
  background: #1b2233; border: 1px solid #2a3550;
  padding: 5px 9px; border-radius: 9px; letter-spacing: 0.2px;
  display: inline-flex; gap: 4px; align-items: center;
}

/* mermaid */
.markdown .mermaid-wrap { position: relative; margin: 18px 0; }
.markdown pre.mermaid {
  border: 1px solid var(--line); border-radius: 14px;
  padding: 16px 8px; text-align: center; overflow-x: auto;
}
.markdown pre.mermaid svg { max-width: 100%; height: auto; }

/* 표 */
.markdown table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px; }
.markdown th {
  text-align: left; color: var(--text-3); font-weight: 800;
  padding: 9px 10px; border-bottom: 1px solid #23262e;
  font-size: 11.5px; letter-spacing: 0.3px;
}
.markdown td { padding: 11px 10px; border-bottom: 1px solid #1a1c22; color: var(--text-2); }
.markdown td:first-child { color: #edeff2; font-weight: 700; }

/* 콜아웃 */
.markdown .callout {
  border-radius: 14px; padding: 15px 17px; margin: 18px 0;
  font-size: 13.5px; line-height: 1.65;
}
.markdown .callout code { background: rgba(255, 255, 255, 0.06); }
.markdown .callout .callout-label {
  display: block; font-weight: 800; font-size: 11px; letter-spacing: 1px; margin-bottom: 7px;
}
.markdown .callout b { color: #edeff2; }
.markdown .callout em { font-style: normal; }
.markdown .callout-tip { background: rgba(74, 147, 255, 0.08); border: 1px solid rgba(74, 147, 255, 0.22); color: #a9c7f2; }
.markdown .callout-tip .callout-label { color: var(--blue); }
.markdown .callout-q { background: rgba(245, 166, 35, 0.09); border: 1px solid rgba(245, 166, 35, 0.22); color: #d7bd8a; }
.markdown .callout-q .callout-label { color: var(--amber); }
.markdown .callout-q em { color: var(--amber); }
</style>
