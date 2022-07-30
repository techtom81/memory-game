import React from 'react'
import { Card } from './Card'

export const CardList = ({ cards, clickHandler }: CardListProps) => (
  <div className="container">
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
