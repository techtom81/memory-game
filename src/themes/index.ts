import { themeList } from './themeList'

export const getThemes = () => {
  for (let i = 0; i < themeList.length; ++i) {
    themeList[i].id = i
  }

  return themeList as ThemeProps
}

type ThemeProps = {
  id: number
  name: string
  grid: number
}[]
