import { Card } from './Card'

export const CardList = ({ cards, clickHandler }) => (
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
