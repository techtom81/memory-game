import React, { useState, useEffect } from 'react';
import { useStateValue } from '../store';
import Card from './Card';

const App = () => {
    const [{ cards }, dispatch] = useStateValue();
    const [gamePaused, setGamePaused] = useState(false);
    const [cardSetArray, setCardSetArray] = useState([]);
    const [gameArray, setGameArray] = useState([]);
    const [gameWon, setGameWon] = useState(false);

    const clickHandler = (e) => {
        if (gamePaused) return false;

        const card = e.currentTarget;
        const cardId = Number(card.id);
        const cardSet = card.dataset.set;
        const cardIndex = cards.findIndex((card) => card.id === cardId);

        if (cards[cardIndex].cardFlipped) return false;

        dispatch({
            type: 'toggleCard',
            cardIndex,
            flipped: true,
        });

        if (cardSetArray.length > 0) {
            if (cardSetArray.includes(cardSet)) {
                setGameArray((prevCardSet) => [...prevCardSet, cardSet]);
                setCardSetArray([]);
            } else {
                setCardSetArray([]);
                setGamePaused(true);
                setTimeout(resetCards, 1000);
            }
        } else {
            setCardSetArray(cardSet);
        }
    };

    const resetCards = () => {
        dispatch({
            type: 'resetCards',
            value: gameArray,
        });

        setGamePaused(false);
    };

    const randomizeCards = () => {
        dispatch({
            type: 'randomizeCards',
        });
    };

    useEffect(() => {
        randomizeCards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (gameArray.length === 6) {
            setGamePaused(true);
            setTimeout(() => {
                alert('Well done!');
                dispatch({
                    type: 'resetAllCards',
                });
                setGameArray([]);
                setGameWon(true);
                setGamePaused(false);
            }, 1000);
        }
    }, [dispatch, gameArray]);

    useEffect(() => {
        setGameWon(false);
        setTimeout(() => {
            dispatch({
                type: 'randomizeCards',
            });
        }, 1000);
    }, [dispatch, gameWon]);

    return (
        <div className="App">
            <div className="container">
                {cards.map((x) => (
                    <Card
                        key={x.id}
                        backSrc={x.backSrc}
                        frontSrc={x.frontSrc}
                        set={x.set}
                        id={x.id}
                        cardFlipped={x.cardFlipped}
                        clickHandler={() => clickHandler}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
