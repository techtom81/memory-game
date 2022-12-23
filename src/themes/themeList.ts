export const themeList: ThemeListProps = [
  { name: 'frozen', grid: 12 },
  { name: 'lego', grid: 12 },
  { name: 'masha', grid: 12 },
  { name: 'ariel', grid: 12 },
  { name: 'hulk', grid: 12 },
  { name: 'lol', grid: 16 },
]

type ThemeListProps = {
  id?: number
  name: string
  grid: number
}[]
