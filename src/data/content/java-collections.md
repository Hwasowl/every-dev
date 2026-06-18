List, Set, Map은 자바 컬렉션의 삼대장입니다. 무엇을 언제 고를지, 그리고 같은 Map이라도 HashMap과 TreeMap이 왜 다른지 봅니다.

## 삼대장의 성격

- **List**: 순서가 있고 중복을 허용, 인덱스로 접근(ArrayList)
- **Set**: 순서가 없고 중복 불가(수학의 집합)
- **Map**: 키-값 쌍, 키는 중복 불가(같은 키로 넣으면 덮어씀)

## 구현체는 순서와 정렬로 갈린다

| 구현체 | 순서 | 시간복잡도 |
| --- | --- | --- |
| HashSet / HashMap | 없음 | 평균 O(1) |
| LinkedHashSet / LinkedHashMap | 입력 순서 유지 | 평균 O(1) |
| TreeSet / TreeMap | 키 자동 정렬 | O(log N) |

해시 기반은 버킷을 바로 찾아 평균 O(1)로 빠릅니다. 트리 기반은 정렬을 얻는 대신 O(log N)이에요. 순서가 필요 없으면 해시가 빠르고, 키 정렬이 필요하면 트리를 씁니다.

## 멀티스레드라면 ConcurrentHashMap

`HashMap` 은 여러 스레드가 동시에 쓰면 내부가 꼬일 수 있습니다. **ConcurrentHashMap** 은 맵 전체가 아니라 _버킷 단위로만_ 락을 걸어, 안전하면서도 성능 손실을 줄여요.

<div class="callout callout-q"><span class="callout-label">한 걸음 더</span>정렬은 TreeMap, 입력 순서는 LinkedHashMap, 동시성은 ConcurrentHashMap, 그 외 기본은 HashMap입니다. 해시가 평균 O(1)인 건 해시로 버킷을 바로 찾기 때문인데, <b>충돌</b>이 한 버킷에 몰리면 그 버킷이 느려져요. 그래서 자바 8부터는 충돌이 심한 버킷을 트리로 바꿔 O(log N)으로 방어합니다.</div>

## 참고

- [말이 트이는 자바와 객체지향 — 인프런](https://www.inflearn.com/courses/lecture?courseId=338480&unitId=336164)
- [Java Collections — Baeldung](https://www.baeldung.com/java-collections)
