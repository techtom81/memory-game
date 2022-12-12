import { themeList } from './themeList'

export const getThemes = () => {
  for (let i = 0; i < themeList.length; ++i) {
    themeList[i].id = i
  }

  return themeList as ThemesProps
}

type ThemesProps = {
  id: number
  name: string
  grid: number
}[]
