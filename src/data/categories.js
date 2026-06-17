export const categories = [
  { id: 'database', name: '데이터베이스', accent: '#4A93FF' },
  { id: 'architecture', name: '아키텍처 · 설계', accent: '#A06BFF' },
  { id: 'messaging', name: '메시징 · 이벤트', accent: '#F5A623' },
  { id: 'resilience', name: '회복탄력성', accent: '#FF6B6B' },
  { id: 'testing', name: '테스트', accent: '#00C471' },
  { id: 'network', name: '네트워크', accent: '#2DD4BF' },
  { id: 'os', name: '운영체제', accent: '#FB923C' },
  { id: 'ds', name: '자료구조 · 알고리즘', accent: '#E879A6' },
]

export function categoryOf(id) {
  return categories.find((c) => c.id === id)
}
