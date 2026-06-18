export const categories = [
  { id: 'database', name: '데이터베이스', accent: '#4A93FF' },
  { id: 'architecture', name: '아키텍처', accent: '#A06BFF' },
  { id: 'messaging', name: '메시징', accent: '#F5A623' },
  { id: 'resilience', name: '회복탄력성', accent: '#FF6B6B' },
  { id: 'testing', name: '테스트', accent: '#00C471' },
  { id: 'interview', name: 'CS 면접', accent: '#00B8D4' },
]

export function categoryOf(id) {
  return categories.find((c) => c.id === id)
}
