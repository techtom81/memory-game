import React from 'react';

const Card = React.memo((props) => {
    return (
        <div className="card-wrapper">
            <button
                id={props.id}
                data-set={props.set}
                className={`card ${props.cardFlipped ? 'is-flipped' : ''} ${props.cardMatched ? ' is-matched' : ''}`}
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
