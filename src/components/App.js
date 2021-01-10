import React, { useState, useEffect } from 'react';
import { useStateValue } from '../store';
import Card from './Card';
import ThemeSelect from './ThemeSelect';

const App = () => {
    const [{ themes, cards }, dispatch] = useStateValue();

    const [theme, setTheme] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gamePaused, setGamePaused] = useState(false);
    const [cardSetArray, setCardSetArray] = useState([]);
    const [gameArray, setGameArray] = useState([]);

    function themeBtnClickHandler(e) {
        if (gamePaused || gameStarted) return false;

        const btn = e.currentTarget;
        setTheme(Number(btn.id));
    }

    function cardClickHandler(e) {
        if (gamePaused) return false;

        const card = e.currentTarget;
        const cardId = Number(card.id);
        const cardSet = card.dataset.set;
        const cardIndex = cards[theme].findIndex((card) => card.id === cardId);

        if (cards[theme][cardIndex].cardFlipped) return false;

        dispatch({
            type: 'toggleCard',
            theme,
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
    }

    const resetCards = () => {
        dispatch({
            type: 'resetCards',
            value: gameArray,
            theme,
        });

        setGamePaused(false);
    };

    const shuffleCards = () => {
        dispatch({
            type: 'shuffleCards',
            theme,
        });
    };

    useEffect(() => {
        shuffleCards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme]);

    useEffect(() => {
        if (cardSetArray.length > 0 || gameArray.length > 0) {
            setGameStarted(true);
        } else {
            setGameStarted(false);
        }
    }, [gameArray, cardSetArray]);

    useEffect(() => {
        if (gameArray.length === 6) {
            setGamePaused(true);
            setTimeout(() => {
                // game won
                dispatch({
                    type: 'resetAllCards',
                    theme,
                });
                setGameArray([]);
            }, 1000);

            setTimeout(() => {
                shuffleCards();
                setGamePaused(false);
            }, 1500);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameArray, theme]);

    return (
        <div className={'App ' + themes[theme].name}>
            <div className="theme-btn-wrapper">
                {themes.map((x) => (
                    <ThemeSelect
                        key={x.id}
                        id={x.id}
                        logo={x.logo}
                        themeName={x.name}
                        disabled={gameStarted}
                        theme={theme}
                        clickHandler={themeBtnClickHandler}
                    />
                ))}
            </div>
            <div className="container">
                {cards[theme].map((x) => (
                    <Card
                        key={x.id}
                        backSrc={x.backSrc}
                        frontSrc={x.frontSrc}
                        set={x.set}
                        id={x.id}
                        cardFlipped={x.cardFlipped}
                        clickHandler={cardClickHandler}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
