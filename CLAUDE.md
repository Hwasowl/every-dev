# every-dev — 작업 규칙

출퇴근길에 한 조각씩 읽는 CS 지식 웹뷰. Vue 3 + Vite, 백엔드 없는 정적 번들.

## 콘텐츠 원칙

- **출처는 루프팩 BE 발제자료뿐.** 발제자료에 없는 일반 CS 지식을 임의로 만들어 넣지 않는다. 새 주제는 발제자료에서 추출해 작성한다.
- 각 글 끝에 `## 참고` 섹션으로 **출처 기술블로그·공식문서 링크**를 단다(발제자료 References 기반). 외부 링크는 새 탭으로 열린다(markdown.js에서 처리).
- 글은 10년차 시니어가 읽어도 모호하지 않게 — 용어는 **개념 → 메커니즘 → 왜** 순으로 풀어 쓴다(약어·jargon은 정의부터).

## 텍스트 스타일 (필수)

- **중간점(`·`) 금지.** 나열은 쉼표(`,`)나 공백으로. 카테고리명·요약·본문·UI 문자열 어디에도 `·`를 쓰지 않는다.
- **볼드 미렌더 패턴 회피.** CommonMark는 `**…)**한글`, `**…"**한글`처럼 *닫는 `**` 바로 앞이 구두점(`)`·`"`)이고 뒤가 한글*이면 볼드를 안 닫고 `**`를 글자로 노출한다. → 닫는 구두점을 볼드 밖으로 뺀다. 예) `**A(B)**를` → `**A**(B)를`.
- 강조는 본문에선 `**굵게**` / `_파란 강조_`, 콜아웃 안에서는 HTML `<b>`·`<em>`을 쓴다.

## 콘텐츠 포맷

- 본문은 `src/data/content/<id>.md` (Notion 익스포트형 마크다운). 등록은 `src/data/articles.js`에 `{ id, categoryId, title, summary, minutes, body }` 한 항목.
- **mermaid는 세로형 `flowchart TD` 권장, 노드 5~6개 이내** (모바일에서 가로로 안 퍼지게). ` ```mermaid ` 펜스 사용.
- **코드 한 줄 ~50자**, 긴 주석은 본문으로. 코드/다이어그램은 리더에서 탭하면 전체화면 확대된다.
- 콜아웃은 HTML 블록으로: `<div class="callout callout-tip">…</div>` (핵심) / `callout-q` (주의·한 걸음 더). 라벨은 `<span class="callout-label">`.

## 상태 / 구조

- 읽음·진도·북마크는 `localStorage`(키 `everydev:v1`). 본 글/안 본 글을 시각 구분한다.
- 카테고리는 `src/data/categories.js`. 글 없는 빈 카테고리는 두지 않는다.

## 변경 후 검증

```bash
# 잔존 ** (볼드 미렌더) 와 · 검사
grep -rn "·" src index.html        # 0 이어야 함
npm run build                       # 빌드 통과 확인
```

마크다운 볼드 잔존 검사는 프로젝트 markdown-it으로 각 .md를 렌더한 뒤 출력 텍스트에 `**`가 남는지 확인한다(코드펜스 제외).

## 배포

- **GitHub Pages (Actions)**. `deploy` 브랜치에 push하면 `.github/workflows/deploy.yml`이 빌드·배포 → https://hwasowl.github.io/every-dev/
- 하네스가 `main` 직접 push를 막으므로 작업 브랜치(`deploy`)로 올린다. 로컬 `main`과 `deploy`는 같은 커밋으로 유지한다.
- `vite.config.js`의 `base`는 빌드 시 `/every-dev/`. 라우팅은 hash 기반(새로고침 404 방지).
