import React, { memo } from 'react'

export const Card = memo(({ id, set, cardFlipped, cardMatched, clickHandler, backSrc, frontSrc }: CardProps) => (
  <div className={`card-wrapper ${cardMatched ? 'is-matched' : ''}`}>
    <button id={id} data-set={set} className={`card ${cardFlipped ? 'is-flipped' : ''}`} onClick={clickHandler}>
      <div className="front">
        <img src={backSrc} alt="" draggable="false" />
      </div>
      <div className="back">
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
