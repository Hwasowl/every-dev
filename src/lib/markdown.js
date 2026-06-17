import MarkdownIt from 'markdown-it'

export const md = new MarkdownIt({
  html: true, // 콜아웃(callout) HTML 블록 통과용
  linkify: true,
  breaks: false,
})

// ```mermaid 코드펜스는 다이어그램으로, 나머지는 기본 코드블록으로.
const defaultFence =
  md.renderer.rules.fence ||
  ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options))

md.renderer.rules.fence = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  if (token.info.trim() === 'mermaid') {
    return `<pre class="mermaid">${token.content}</pre>`
  }
  return defaultFence(tokens, idx, options, env, self)
}

// 외부 참고 링크는 새 탭에서 열어 앱(SPA) 이탈을 막는다.
const defaultLinkOpen =
  md.renderer.rules.link_open ||
  ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options))

md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  const href = token.attrGet('href') || ''
  if (/^https?:\/\//.test(href)) {
    token.attrSet('target', '_blank')
    token.attrSet('rel', 'noopener noreferrer')
  }
  return defaultLinkOpen(tokens, idx, options, env, self)
}

export function renderMarkdown(src) {
  return md.render(src || '')
}
