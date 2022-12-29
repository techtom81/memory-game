import React from 'react'
import { ThemeButton } from '../ThemeButton/ThemeButton'

import styles from './ThemeBar.module.scss'

export const ThemeBar = ({ themes, clickHandler }: ThemeBarProps) => (
  <div className={styles.themeBar}>
    {themes.map(({ id, name }: { id: number; name: string }) => {
      const logo = `./images/themes/${name}/${name}.png`

      return <ThemeButton key={id} id={id} logo={logo} themeName={name} clickHandler={clickHandler} />
    })}
  </div>
)

type ThemeBarProps = {
  themes: {
    id: number
    name: string
    grid?: number
  }[]
  clickHandler: React.MouseEventHandler<HTMLButtonElement> | undefined
}
