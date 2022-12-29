import React, { memo } from 'react'

import styles from './ThemeButton.module.scss'

export const ThemeButton = memo(({ id, clickHandler, logo, themeName }: ThemeButtonProps) => (
  <button className={styles.themeButton} id={id.toString()} onClick={clickHandler}>
    <img src={logo} alt={themeName} draggable="false" />
  </button>
))

type ThemeButtonProps = {
  id: number
  logo: string
  themeName: string
  clickHandler: React.MouseEventHandler<HTMLButtonElement> | undefined
}
