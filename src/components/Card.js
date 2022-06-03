import React from 'react'

export const Card = React.memo(({ id, set, cardFlipped, cardMatched, clickHandler, backSrc, frontSrc }) => {
  return (
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
  )
})
