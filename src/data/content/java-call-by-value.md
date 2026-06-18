"자바는 Call by Reference다"는 흔한 오해입니다. 자바는 _항상_ **Call by Value**, 값을 복사해 넘겨요. 객체를 넘겼는데 바뀌는 것처럼 보이는 이유를 정확히 짚습니다.

## 기본형과 참조형은 저장 위치가 다르다

- **기본형**(int, double, boolean 등): 값 자체가 Stack에 저장. null 불가.
- **참조형**(객체, 배열, String 등): 변수엔 Heap 주소만, 실제 값은 Heap에. null 가능.

## 자바는 항상 값을 복사한다

메서드에 인자를 넘기면 자바는 늘 _복사본_ 을 줍니다.

기본형은 값을 복사하니, 메서드 안에서 바꿔도 원본은 그대로예요.

```java
void f(int n) { n = 20; }
int a = 10;
f(a);   // a는 여전히 10
```

참조형은 "주소값"을 복사합니다. 복사된 주소가 _같은 객체_ 를 가리키니, 객체 내부 필드를 바꾸면 원본에도 반영돼요. 이게 Call by Reference로 착각하는 지점입니다.

```java
void rename(Person p) { p.name = "John"; }
// 호출 후 원본 객체의 name도 John
```

하지만 메서드 안에서 참조를 _새 객체로_ 갈아끼우면 원본엔 영향이 없습니다. 복사된 주소만 바뀔 뿐이니까요.

```java
void reset(Person p) { p = new Person(); }
// 원본은 그대로
```

## 래퍼 클래스는 왜 있나

컬렉션엔 기본형을 직접 못 넣어 `Integer` 같은 래퍼로 감쌉니다. 기본형과 래퍼 사이 변환은 오토박싱과 언박싱으로 자동 처리돼요.

<div class="callout callout-q"><span class="callout-label">한 걸음 더</span>핵심 한 줄 — 자바는 "주소값을 복사"할 뿐, 객체를 복사하지도 변수 자체를 넘기지도 않습니다. 그래서 인자로 받은 객체의 <b>내부</b>는 바꿀 수 있어도, 받은 참조를 새것으로 바꿔 호출자에게 돌려줄 수는 없어요. 바꾼 결과가 필요하면 반환값으로 돌려주세요.</div>

## 참고

- [말이 트이는 자바와 객체지향 — 인프런](https://www.inflearn.com/courses/lecture?courseId=338480&unitId=336155)
- [Pass-By-Value as a Parameter Passing Mechanism — Baeldung](https://www.baeldung.com/java-pass-by-value-or-reference)
