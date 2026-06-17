import dbPhantom from './content/db-phantom-read.md?raw'
import dbIndex from './content/db-index.md?raw'
import dbCache from './content/db-cache-ttl.md?raw'
import netTcp from './content/net-tcp-handshake.md?raw'
import osProcess from './content/os-process-thread.md?raw'
import dsHash from './content/ds-hash-table.md?raw'

export const articles = [
  {
    id: 'db-phantom-read',
    categoryId: 'database',
    title: 'RepeatableRead인데 Phantom Read가 없다고?',
    summary: 'InnoDB가 표준과 달리 팬텀을 막는 진짜 이유, 그리고 FOR UPDATE의 반전.',
    minutes: 7,
    body: dbPhantom,
  },
  {
    id: 'db-index',
    categoryId: 'database',
    title: '인덱스는 왜 빨라질까',
    summary: 'B-Tree 책갈피로 풀스캔을 건너뛰는 원리와 복합 인덱스의 순서.',
    minutes: 5,
    body: dbIndex,
  },
  {
    id: 'db-cache-ttl',
    categoryId: 'database',
    title: '캐시 전략 — TTL과 무효화',
    summary: '속도와 정확도 사이의 균형. 언제 저장하고 언제 비울 것인가.',
    minutes: 6,
    body: dbCache,
  },
  {
    id: 'net-tcp-handshake',
    categoryId: 'network',
    title: 'TCP 3-way handshake',
    summary: '연결은 어떻게 신뢰를 만드는가. 왜 하필 세 번인가.',
    minutes: 4,
    body: netTcp,
  },
  {
    id: 'os-process-thread',
    categoryId: 'os',
    title: '프로세스와 스레드, 무엇이 다른가',
    summary: '격리와 공유. 이 한 끗이 동시성 버그의 성격을 가른다.',
    minutes: 4,
    body: osProcess,
  },
  {
    id: 'ds-hash-table',
    categoryId: 'ds',
    title: '해시 테이블은 어떻게 O(1)인가',
    summary: '키를 주소로 바꾸는 계산, 그리고 충돌이라는 현실.',
    minutes: 4,
    body: dsHash,
  },
]

export function articleById(id) {
  return articles.find((a) => a.id === id)
}

export function articlesByCategory(categoryId) {
  return articles.filter((a) => a.categoryId === categoryId)
}

// 날짜 기반 결정적 '오늘의 지식' — 같은 날엔 같은 글.
export function todaysArticle(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((date - start) / 86400000)
  return articles[dayOfYear % articles.length]
}
