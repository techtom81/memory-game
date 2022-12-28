import React from 'react'
import { Card } from '../Card/Card'
import classNames from 'classnames'

import styles from './CardList.module.scss'

export const CardList = ({ cards, clickHandler }: CardListProps) => (
  <div
    className={classNames(styles.grid, {
      [styles.small]: cards.length < 16,
      [styles.medium]: cards.length > 12 && cards.length < 20,
      [styles.large]: cards.length > 16,
    })}>
    {cards.map(({ id, backSrc, frontSrc, set, cardFlipped, cardMatched }) => (
      <Card
        key={id}
        backSrc={backSrc}
        frontSrc={frontSrc}
        set={set}
        id={id}
        cardFlipped={cardFlipped}
        cardMatched={cardMatched}
        clickHandler={clickHandler}
      />
    ))}
  </div>
)

type CardListProps = {
  cards: [CardProps]
  clickHandler: React.MouseEventHandler<HTMLButtonElement> | undefined
}

type CardProps = {
  id: string
  set: string
  cardFlipped: boolean
  cardMatched: boolean
  backSrc: string
  frontSrc: string
}
