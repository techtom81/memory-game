import React from 'react';

const Card = React.memo((props) => {
    return (
        <div className={`card-wrapper ${props.cardMatched ? 'is-matched' : ''}`}>
            <button
                id={props.id}
                data-set={props.set}
                className={`card ${props.cardFlipped ? 'is-flipped' : ''}`}
                onClick={props.clickHandler}>
                <div className="front">
                    <img src={props.backSrc} alt="" draggable="false" />
                </div>
                <div className="back">
                    <img src={props.frontSrc} alt="" draggable="false" />
                </div>
            </button>
        </div>
    );
});

export default Card;