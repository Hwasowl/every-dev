다형성은 객체지향의 꽃입니다. `if` 분기 없이 코드를 유연하게 만드는 원리와, 그걸 떠받치는 인터페이스와 추상 클래스를 봅니다.

## 오버라이딩과 동적 바인딩

부모의 메서드를 자식이 재정의(오버라이딩)하면, 실제 실행은 _실행 시점의 객체_ 를 기준으로 결정됩니다(동적 바인딩).

```java
Animal a = new Dog();
a.speak();   // Dog의 speak가 실행됨
```

자식을 부모 타입으로 묶는 게 업캐스팅, 되돌리는 게 다운캐스팅입니다. 다운캐스팅 전엔 `instanceof` 로 실제 타입을 확인해야 해요. 안 그러면 런타임에 ClassCastException이 납니다.

## 다형성이 분기를 없앤다

`Shape` 인터페이스의 `draw()` 를 Circle과 Square가 각자 구현하면, 호출하는 쪽은 `if` 없이 `shape.draw()` 한 줄이면 됩니다. 새 도형이 추가돼도 호출부는 그대로예요(OCP 그 자체).

## 인터페이스 vs 추상 클래스

| 구분 | 인터페이스 | 추상 클래스 |
| --- | --- | --- |
| 다중 | 여러 개 구현 | 하나만 상속 |
| 상태 | 필드 없음(상수만) | 인스턴스 필드 보유 |
| 의미 | "할 수 있다"(능력) | "이다"(공통 뼈대) |

자바는 클래스 단일 상속만 되므로, 여러 능력을 붙이려면 인터페이스 다중 구현을 씁니다. 공통 구현과 _상태_ 까지 물려주고 싶을 때만 추상 클래스예요.

## final, 접근제어자, static

- **final**: 변수는 상수, 메서드는 오버라이딩 금지, 클래스는 상속 금지
- **접근제어자**: public, protected, default, private 순으로 좁아짐(캡슐화 도구)
- **static**: 객체 없이 클래스에 하나만 존재하고 Method Area에 저장. `클래스명.멤버` 로 접근

<div class="callout callout-q"><span class="callout-label">한 걸음 더</span>인터페이스에 default 메서드가 생기며 둘의 경계가 흐려졌지만, 가르는 기준은 여전히 <b>상태(필드)를 갖느냐</b>와 <b>is-a냐 can-do냐</b>입니다. 공통 구현과 상태를 물려주려면 추상 클래스, 서로 다른 계층에 능력만 부여하려면 인터페이스를 고르세요.</div>

## 참고

- [말이 트이는 자바와 객체지향 — 인프런](https://www.inflearn.com/courses/lecture?courseId=338480&unitId=336161)
- [Interface vs Abstract Class — Baeldung](https://www.baeldung.com/java-interface-vs-abstract-class)
