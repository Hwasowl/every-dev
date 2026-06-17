# every-dev

출퇴근길에 한 조각씩 읽는 CS 지식. 토스 앱 같은 가독성에 mermaid 시각화를 더한 모바일 웹뷰.

- **스택**: Vue 3 + Vite, 백엔드 없음(정적 번들)
- **콘텐츠**: `src/data/content/*.md` (Notion 익스포트형 마크다운 + mermaid)
- **상태**: 읽음 / 진도 / 북마크를 `localStorage`에 저장 — 본 지식과 안 본 지식을 구분해서 보여줌
- **다크 모드 · 나눔고딕**, 아이콘 없는 절제된 UI

## 실행

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 정적 빌드 → dist/
```

## 구조

```
src/
  data/            카테고리 · 아티클 인덱스, 콘텐츠 마크다운
  composables/     useLibrary — localStorage 읽음/진도/북마크
  lib/             markdown-it · mermaid 설정
  components/      TabBar, ArticleListItem, MarkdownView, ZoomOverlay
  views/           Home, Categories, Category, Article, Bookmarks
```

## 콘텐츠 추가하기

1. `src/data/content/<id>.md` 에 본문 작성 (mermaid는 ```` ```mermaid ```` 펜스, 다이어그램은 세로형 `flowchart TD` 권장)
2. `src/data/articles.js` 에 항목 추가 (`id`, `categoryId`, `title`, `summary`, `minutes`)
