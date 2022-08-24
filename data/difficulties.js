const difficulties = [
  {
    id: 'veasy',
    name: 'Очень низкая',
    filter: ['hard', 'normal']
  },
  {
    id: 'easy',
    name: 'Низкая',
    filter: ['hard', '']
  },
  {
    id: 'normal',
    name: 'Средняя',
    filter: ['', '']
  },
  {
    id: 'hard',
    name: 'Высокая',
    filter: ['easy', '']
  },
  {
    id: 'vhard',
    name: 'Очент высокая',
    filter: ['easy', 'normal']
  },
]

export default difficulties