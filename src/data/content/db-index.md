상품 목록을 `brand_id` 로 필터하고 `price` 로 정렬하는데 느리다면, 원인은 대개 **인덱스가 없거나, 있어도 안 쓰이는** 경우입니다. 인덱스가 왜 빠른지부터, 왜 안 먹는지까지 짚어봅니다.

## 책갈피로 건너뛴다

인덱스는 대부분 **B-Tree** 기반입니다. 전체 테이블을 한 줄씩 훑는 대신, 정렬된 값의 _책갈피_ 를 따라 필요한 데이터로 바로 점프합니다.

<div class="callout callout-tip"><span class="callout-label">비유</span>서점에서 Java 책을 찾을 때 — 인덱스가 없으면 IT 코너의 모든 책을 확인해야 하고, 있으면 책의 위치를 바로 알아 곧장 집어옵니다.</div>

```mermaid
flowchart TD
    A["WHERE brand_id = 1<br/>ORDER BY price"] --> B{"인덱스 있나?"}
    B -->|없음| C["풀스캔<br/>rows 10,000, filesort"]
    B -->|"(brand_id, price)"| D["인덱스 스캔<br/>rows 200, using index"]
```

## 단일 vs 복합 인덱스

```sql
-- 단일: brand_id 필터는 빠르지만 정렬은 커버 못 함
CREATE INDEX idx_brand ON products(brand_id);

-- 복합: 필터 + 정렬까지 한 번에 커버
CREATE INDEX idx_brand_price ON products(brand_id, price);
```

복합 인덱스는 **왼쪽에서 오른쪽 순서** 로 조건을 쓸 때만 효과가 있습니다. 정렬 컬럼을 앞에 두면 필터부터 어긋나 인덱스가 통째로 무시돼요.

| 인덱스 | WHERE brand_id | ORDER BY price |
| --- | --- | --- |
| (brand_id) | 가능 | 불가 |
| (brand_id, price) | 가능 | 가능 |
| (price, brand_id) | 불가 | 불가 |

## EXPLAIN으로 실행 계획 읽기

쿼리 앞에 `EXPLAIN` 을 붙이면 옵티마이저가 인덱스를 _실제로_ 쓰는지 보입니다. 네 항목만 봐도 충분해요.

| 항목 | 의미 | 확인 포인트 |
| --- | --- | --- |
| key | 사용된 인덱스 이름 | null이면 인덱스 미사용 |
| type | 접근 방식 | ALL이면 풀스캔, range/ref면 양호 |
| rows | 예측 스캔 행 수 | 낮을수록 좋음 |
| Extra | 추가 정보 | Using index 좋음, Using filesort 나쁨 |

같은 쿼리가 인덱스 하나로 어떻게 달라지는지 보면 분명합니다.

```sql
SELECT * FROM products
WHERE brand_id = 1 ORDER BY price ASC;
-- 인덱스 없음: rows 10,000, Extra: Using filesort
-- (brand_id, price) 추가 후: rows 200, Extra: Using index
```

`Using filesort` 는 인덱스 정렬이 안 먹어 _별도 정렬 연산_ 이 따로 돈다는 신호입니다. 정렬까지 인덱스가 커버하면 이 단계가 통째로 사라져요.

## 카디널리티가 높은 컬럼에 건다

**카디널리티**(cardinality)는 값의 다양성, 곧 중복이 얼마나 적은지입니다. 인덱스는 카디널리티가 _높은_ 컬럼에 걸어야 효과가 큽니다. 한 번에 후보를 확 좁혀주기 때문이에요.

- 성별은 값이 둘뿐 → 카디널리티 낮음 → 인덱스 효과 미미
- 주민등록번호는 사람마다 고유 → 카디널리티 높음 → 후보가 1건으로 좁혀짐

복합 인덱스의 컬럼 순서도 보통 _자주 쓰는 등치 조건_ 을 앞에, 범위/정렬 컬럼을 뒤에 둡니다. 예를 들어 "특정 유저가 좋아요한 상품 중 최근 30일, 5000원 이상"이면 `(user_id, updated_at, price)` 순서가 자연스러워요.

## 페이지네이션의 함정, OFFSET

`LIMIT 20 OFFSET 100000` 은 10만 건을 _읽어서 버리고_ 그다음 20건을 줍니다. 페이지가 뒤로 갈수록 버리는 양이 누적돼 느려져요. 마지막으로 본 값을 기준으로 잘라내는 커서 방식(`WHERE price > 마지막값`)이 대안입니다.

<div class="callout callout-q"><span class="callout-label">버전 주의</span>정렬 방향(ASC/DESC)은 <b>MySQL 8.0</b>부터 옵티마이저가 단일 인덱스로 양방향을 지원합니다. 하지만 <b>5.7 이하</b>에선 DESC 정렬 때 <em>Using filesort</em>가 붙거나 별도 인덱스가 필요할 수 있어요. 또 자주 바뀌는 컬럼에 인덱스를 남발하면 쓰기 때마다 인덱스도 고쳐야 해 쓰기가 느려지고, 모수가 작을 땐 풀스캔이 오히려 빠릅니다.</div>

## 참고

- [쿼리 튜닝과 인덱스 최적화 — WikiDocs](https://wikidocs.net/226253)
- [MySQL 방향별 인덱스 — 카카오 테크](https://tech.kakao.com/posts/351)
