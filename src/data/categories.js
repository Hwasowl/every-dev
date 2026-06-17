export const categories = [
  { id: 'database', name: '데이터베이스', accent: '#4A93FF' },
  { id: 'network', name: '네트워크', accent: '#00C471' },
  { id: 'os', name: '운영체제', accent: '#F5A623' },
  { id: 'ds', name: '자료구조 · 알고리즘', accent: '#A06BFF' },
]

export function categoryOf(id) {
  return categories.find((c) => c.id === id)
}
