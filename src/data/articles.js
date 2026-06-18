import dbPhantom from './content/db-phantom-read.md?raw'
import dbIndex from './content/db-index.md?raw'
import dbCache from './content/db-cache-ttl.md?raw'
import dbLikeCountSort from './content/db-like-count-sort.md?raw'
import archSoftwareDesign from './content/arch-software-design.md?raw'
import archDomainModeling from './content/arch-domain-modeling.md?raw'
import archSpringRequest from './content/arch-spring-request-handling.md?raw'
import msgEventKafka from './content/msg-event-kafka.md?raw'
import msgWaitingQueue from './content/msg-waiting-queue.md?raw'
import msgRedisRanking from './content/msg-redis-ranking.md?raw'
import resilienceFailureReady from './content/resilience-failure-ready.md?raw'
import testTdd from './content/test-tdd.md?raw'
import osProcessMemory from './content/os-process-memory.md?raw'
import osThreadVsProcess from './content/os-thread-vs-process.md?raw'
import osScheduling from './content/os-scheduling.md?raw'
import osRaceCondition from './content/os-race-condition.md?raw'
import osDeadlock from './content/os-deadlock.md?raw'
import osVirtualMemory from './content/os-virtual-memory.md?raw'
import caNumberRepresentation from './content/ca-number-representation.md?raw'
import caCharacterEncoding from './content/ca-character-encoding.md?raw'
import caCpuInstruction from './content/ca-cpu-instruction.md?raw'
import caPipelining from './content/ca-pipelining.md?raw'
import caCacheMemory from './content/ca-cache-memory.md?raw'
import caStorageRaid from './content/ca-storage-raid.md?raw'
import javaJvmExecution from './content/java-jvm-execution.md?raw'
import javaGarbageCollection from './content/java-garbage-collection.md?raw'
import javaCallByValue from './content/java-call-by-value.md?raw'
import javaOopSolid from './content/java-oop-solid.md?raw'
import javaPolymorphism from './content/java-polymorphism.md?raw'
import javaCollections from './content/java-collections.md?raw'
import javaSynchronizedVolatile from './content/java-synchronized-volatile.md?raw'
import javaExceptionEqualsString from './content/java-exception-equals-string.md?raw'
import javaModernStream from './content/java-modern-stream.md?raw'

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
    summary: 'B-Tree 책갈피, 복합 인덱스 순서, EXPLAIN과 카디널리티까지.',
    minutes: 8,
    body: dbIndex,
  },
  {
    id: 'db-like-count-sort',
    categoryId: 'database',
    title: '좋아요 수로 정렬하면 왜 느려질까',
    summary: '조인 집계 정렬의 한계와 비정규화, 조회 전용 Pre-aggregation.',
    minutes: 7,
    body: dbLikeCountSort,
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
  {
    id: 'arch-spring-request-handling',
    categoryId: 'architecture',
    title: '스프링부트는 요청 1만 개를 어떻게 동시에 처리할까',
    summary: '내장 톰캣 스레드 풀, NIO 커넥터, accept-count와 max-connections.',
    minutes: 7,
    body: archSpringRequest,
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
  // CS 면접 — 깃허브 (운영체제)
  {
    id: 'os-process-memory',
    categoryId: 'interview',
    title: '(깃허브) 프로세스는 메모리에 어떻게 자리잡을까',
    summary: '코드/데이터/힙/스택 4영역, PCB, 컨텍스트 스위치.',
    minutes: 7,
    body: osProcessMemory,
  },
  {
    id: 'os-thread-vs-process',
    categoryId: 'interview',
    title: '(깃허브) 스레드와 프로세스는 무엇이 다른가',
    summary: '메모리 공유와 격리, 스레드별 독립 스택, 멀티스레딩의 양면.',
    minutes: 6,
    body: osThreadVsProcess,
  },
  {
    id: 'os-scheduling',
    categoryId: 'interview',
    title: '(깃허브) CPU는 누구에게 먼저 줄까',
    summary: '선점/비선점, FCFS와 SJF, RR, Priority, 기아와 노화.',
    minutes: 7,
    body: osScheduling,
  },
  {
    id: 'os-race-condition',
    categoryId: 'interview',
    title: '(깃허브) 동시성의 적, Race Condition과 임계구역',
    summary: 'read-modify-write가 쪼개지는 문제와 뮤텍스/세마포어.',
    minutes: 7,
    body: osRaceCondition,
  },
  {
    id: 'os-deadlock',
    categoryId: 'interview',
    title: '(깃허브) 데드락은 왜 멈추고 어떻게 푸나',
    summary: '교착 4조건과 예방, 회피, 탐지, 은행원 알고리즘.',
    minutes: 7,
    body: osDeadlock,
  },
  {
    id: 'os-virtual-memory',
    categoryId: 'interview',
    title: '(깃허브) 메모리가 부족할 때, 가상 메모리',
    summary: 'MMU와 페이지, 요구 페이징과 페이지 폴트, 교체 알고리즘.',
    minutes: 8,
    body: osVirtualMemory,
  },
  // CS 면접 — 인프런 (컴퓨터 구조)
  {
    id: 'ca-number-representation',
    categoryId: 'interview',
    title: '(인프런) 컴퓨터는 숫자를 어떻게 저장할까',
    summary: '2의 보수와 부동소수점, 그리고 0.1+0.2가 0.3이 아닌 이유.',
    minutes: 7,
    body: caNumberRepresentation,
  },
  {
    id: 'ca-character-encoding',
    categoryId: 'interview',
    title: '(인프런) 글자는 어떻게 0과 1이 되나',
    summary: 'ASCII, 유니코드, UTF-8과 글자가 깨지는 이유.',
    minutes: 6,
    body: caCharacterEncoding,
  },
  {
    id: 'ca-cpu-instruction',
    categoryId: 'interview',
    title: '(인프런) CPU는 명령어를 어떻게 실행할까',
    summary: 'CPU 3요소와 명령어 사이클, 주소지정 방식, 인터럽트.',
    minutes: 8,
    body: caCpuInstruction,
  },
  {
    id: 'ca-pipelining',
    categoryId: 'interview',
    title: '(인프런) 파이프라이닝, 한 번에 더 많이 처리하는 법',
    summary: 'k배 속도향상 공식, 해저드 3종, 슈퍼스칼라와 RISC.',
    minutes: 7,
    body: caPipelining,
  },
  {
    id: 'ca-cache-memory',
    categoryId: 'interview',
    title: '(인프런) CPU 캐시는 왜 빠른가',
    summary: '메모리 계층과 지역성, 평균 접근시간 AMAT, MMU.',
    minutes: 7,
    body: caCacheMemory,
  },
  {
    id: 'ca-storage-raid',
    categoryId: 'interview',
    title: '(인프런) 디스크와 SSD, 그리고 RAID',
    summary: 'HDD 접근 시간, 플래시 메모리, RAID와 DMA.',
    minutes: 7,
    body: caStorageRaid,
  },
  // CS 면접 — 인프런 (자바와 객체지향)
  {
    id: 'java-jvm-execution',
    categoryId: 'interview',
    title: '(인프런) JVM은 자바를 어떻게 실행할까',
    summary: '바이트코드와 JVM 4부품, 메모리 영역, 인터프리터와 JIT.',
    minutes: 7,
    body: javaJvmExecution,
  },
  {
    id: 'java-garbage-collection',
    categoryId: 'interview',
    title: '(인프런) GC는 무엇을 언제 치우나',
    summary: '도달 가능성, Mark-Sweep-Compaction, 세대 구분과 멈춤.',
    minutes: 7,
    body: javaGarbageCollection,
  },
  {
    id: 'java-call-by-value',
    categoryId: 'interview',
    title: '(인프런) 자바는 항상 Call by Value',
    summary: '기본형과 참조형, 주소값 복사, Call by Reference 오해 풀기.',
    minutes: 7,
    body: javaCallByValue,
  },
  {
    id: 'java-oop-solid',
    categoryId: 'interview',
    title: '(인프런) 객체지향과 SOLID',
    summary: '추상화/캡슐화/상속/다형성과 SOLID 다섯 원칙.',
    minutes: 7,
    body: javaOopSolid,
  },
  {
    id: 'java-polymorphism',
    categoryId: 'interview',
    title: '(인프런) 다형성, 인터페이스와 추상 클래스',
    summary: '오버라이딩과 동적 바인딩, 인터페이스 vs 추상 클래스, final.',
    minutes: 7,
    body: javaPolymorphism,
  },
  {
    id: 'java-collections',
    categoryId: 'interview',
    title: '(인프런) 컬렉션 고르기, List Set Map',
    summary: '삼대장의 성격과 해시/트리 구현체, ConcurrentHashMap.',
    minutes: 6,
    body: javaCollections,
  },
  {
    id: 'java-synchronized-volatile',
    categoryId: 'interview',
    title: '(인프런) synchronized와 volatile',
    summary: '멀티스레딩 구현, 가시성과 원자성, 두 키워드의 차이.',
    minutes: 7,
    body: javaSynchronizedVolatile,
  },
  {
    id: 'java-exception-equals-string',
    categoryId: 'interview',
    title: '(인프런) 예외, equals, 그리고 String',
    summary: '예외 계층과 checked/unchecked, ==와 equals/hashCode, String 삼형제.',
    minutes: 8,
    body: javaExceptionEqualsString,
  },
  {
    id: 'java-modern-stream',
    categoryId: 'interview',
    title: '(인프런) 모던 자바, 람다와 Stream',
    summary: '함수형 인터페이스와 람다, Stream의 내부 반복과 지연 평가.',
    minutes: 6,
    body: javaModernStream,
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
