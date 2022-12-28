import React, { memo } from 'react'
import classNames from 'classnames'

import styles from './Card.module.scss'

export const Card = memo(({ id, set, cardFlipped, cardMatched, clickHandler, backSrc, frontSrc }: CardProps) => (
  <div className={classNames(styles.cardWrapper, { [styles.isMatched]: cardMatched })}>
    <button
      id={id}
      data-set={set}
      className={classNames(styles.card, { [styles.isFlipped]: cardFlipped })}
      onClick={clickHandler}>
      <div className={styles.front}>
        <img src={backSrc} alt="" draggable="false" />
      </div>
      <div className={styles.back}>
        <img src={frontSrc} alt="" draggable="false" />
      </div>
    </button>
  </div>
))

type CardProps = {
  id: string
  set: string
  cardFlipped: boolean
  cardMatched: boolean
  backSrc: string
  frontSrc: string
  clickHandler: React.MouseEventHandler<HTMLButtonElement> | undefined
}
