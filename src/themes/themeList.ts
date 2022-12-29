export const themeList: ThemeListProps = [
  { name: 'frozen' },
  { name: 'lego' },
  { name: 'masha' },
  { name: 'ariel' },
  { name: 'hulk' },
  { name: 'lol', grid: 20 },
]

type ThemeListProps = {
  id?: number
  name: string
  grid?: number
}[]
