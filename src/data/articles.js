import dbPhantom from './content/db-phantom-read.md?raw'
import dbIndex from './content/db-index.md?raw'
import dbCache from './content/db-cache-ttl.md?raw'
import archSoftwareDesign from './content/arch-software-design.md?raw'
import archDomainModeling from './content/arch-domain-modeling.md?raw'
import msgEventKafka from './content/msg-event-kafka.md?raw'
import msgWaitingQueue from './content/msg-waiting-queue.md?raw'
import msgRedisRanking from './content/msg-redis-ranking.md?raw'
import resilienceFailureReady from './content/resilience-failure-ready.md?raw'
import testTdd from './content/test-tdd.md?raw'

export const articles = [
  // 데이터베이스
  {
    id: 'db-phantom-read',
    categoryId: 'database',
    title: 'RepeatableRead인데 Phantom Read가 없다고?',
    summary: '격리 수준 4단계부터 MVCC 스냅샷, FOR UPDATE의 반전, 그리고 락 전략까지.',
    minutes: 9,
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
  // 아키텍처
  {
    id: 'arch-software-design',
    categoryId: 'architecture',
    title: '요구사항은 어떻게 도메인 모델과 ERD가 되는가',
    summary: '유스케이스, 유비쿼터스 언어, 시퀀스, ERD로 이어지는 설계 한 줄기.',
    minutes: 7,
    body: archSoftwareDesign,
  },
  {
    id: 'arch-domain-modeling',
    categoryId: 'architecture',
    title: '좋아요는 왜 likeCount++로 끝나면 안 될까',
    summary: 'Entity, VO, 서비스 구분과 DIP로 만드는 테스트 가능한 구조.',
    minutes: 7,
    body: archDomainModeling,
  },
  // 메시징
  {
    id: 'msg-event-kafka',
    categoryId: 'messaging',
    title: '무거운 주문 트랜잭션, 이벤트로 쪼개도 될까',
    summary: 'AFTER_COMMIT 이벤트 분리부터 Kafka, Outbox, 멱등 Consumer까지.',
    minutes: 9,
    body: msgEventKafka,
  },
  {
    id: 'msg-waiting-queue',
    categoryId: 'messaging',
    title: '트래픽이 몰릴 때, 거부할까 기다리게 할까',
    summary: 'back-pressure와 Redis 대기열, 그리고 Thundering Herd의 함정.',
    minutes: 8,
    body: msgWaitingQueue,
  },
  {
    id: 'msg-redis-ranking',
    categoryId: 'messaging',
    title: '랭킹은 왜 ORDER BY가 아니라 Redis ZSET일까',
    summary: '이벤트로 실시간 집계하는 ZSET 랭킹과 콜드 스타트 해법.',
    minutes: 7,
    body: msgRedisRanking,
  },
  // 회복탄력성
  {
    id: 'resilience-failure-ready',
    categoryId: 'resilience',
    title: 'PG 서버가 멈추면 내 시스템도 같이 죽을까',
    summary: '타임아웃, 재시도, 서킷브레이커, 폴백으로 장애 전파를 끊는 법.',
    minutes: 7,
    body: resilienceFailureReady,
  },
  // 테스트
  {
    id: 'test-tdd',
    categoryId: 'testing',
    title: '테스트를 먼저 쓰면 정말 설계가 좋아질까',
    summary: 'TDD의 본질과 테스트 더블, 테스트 가능한 구조로 바꾸는 법.',
    minutes: 7,
    body: testTdd,
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
