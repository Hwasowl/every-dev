멀티스레드에서 `count++` 를 2000번 돌렸는데 결과가 2000이 안 나옵니다. 자바가 동시성을 다루는 두 키워드 **synchronized** 와 **volatile** 로 풀어봅니다.

## 멀티스레딩을 만드는 세 방법

- **Thread 상속** + `start()` 호출(`run()` 을 직접 부르면 멀티스레딩이 아님)
- **Runnable 구현**: 단일 상속 제약을 피해 더 유연, 실무 선호
- **Executors**: 스레드 풀로 재사용해 생성/종료 비용을 아낌, 실무 권장

## count++는 쪼개진다

`count++` 는 한 줄 같지만 읽기, 증가, 쓰기 세 단계입니다. 두 스레드가 같은 값을 읽으면 한쪽의 증가가 사라져요(사이트의 Race Condition 글에서 본 그 문제).

`synchronized` 는 한 번에 한 스레드만 그 블록에 들여보내 이를 막습니다. 가시성과 원자성을 _함께_ 보장해요.

## volatile은 가시성만 준다

`volatile` 변수는 CPU 캐시 대신 _항상 메인 메모리_ 에서 읽고 씁니다. 그래서 한 스레드의 변경을 다른 스레드가 곧장 보죠(가시성). 하지만 원자성은 없어서 `count++` 같은 다단계 연산엔 부족합니다.

| 구분 | synchronized | volatile |
| --- | --- | --- |
| 가시성 | 보장 | 보장 |
| 원자성 | 보장 | 보장 안 함 |
| 비용 | 큼 | 작음 |
| 용도 | 복합 연산 | 단순 플래그 |

## 언제 무엇을

상태를 켜고 끄는 단순 플래그(`boolean running`)는 volatile로 충분하고 가볍습니다. 읽고 고쳐 쓰는 복합 연산은 synchronized나 Atomic 계열을 써야 해요.

<div class="callout callout-q"><span class="callout-label">한 걸음 더</span>volatile을 원자적이라 오해해 카운터에 쓰면 값이 샙니다. 이건 OS의 Race Condition 글에서 본 <b>read-modify-write</b> 문제의 자바판이에요. 임계구역이 무엇인지는 그 글에 맡기고, 여기선 "가시성과 원자성은 다르다"만 확실히 챙기세요.</div>

## 참고

- [말이 트이는 자바와 객체지향 — 인프런](https://www.inflearn.com/courses/lecture?courseId=338480&unitId=336167)
- [Guide to the volatile Keyword — Baeldung](https://www.baeldung.com/java-volatile)
