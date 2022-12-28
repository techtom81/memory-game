import React, { memo } from 'react'
import classNames from 'classnames'

import styles from './ThemeButton.module.scss'

export const ThemeButton = memo(({ id, clickHandler, logo, theme, themeName }: ThemeButtonProps) => (
  <button
    className={classNames(styles.themeButton, { [styles.isActive]: id === theme })}
    id={id.toString()}
    onClick={clickHandler}>
    <img src={logo} alt={themeName} draggable="false" />
  </button>
))

type ThemeButtonProps = {
  id: number
  logo: string
  theme: number
  themeName: string
  clickHandler: React.MouseEventHandler<HTMLButtonElement> | undefined
}
