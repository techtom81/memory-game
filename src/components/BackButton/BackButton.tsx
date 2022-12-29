import React from 'react'

import style from './BackButton.module.scss'

export const BackButton = ({ clickHandler }: BackButtonProps) => (
  <button className={style.backButton} onClick={clickHandler} aria-label="Go back to menu">
    <img src="/images/arrow-left-curved.svg" alt="Back to menu" />
  </button>
)

type BackButtonProps = {
  clickHandler: React.MouseEventHandler<HTMLButtonElement> | undefined
}
